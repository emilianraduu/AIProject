import json
import random
from costs import check_hard_constraints, subjects_order_cost, empty_space_groups_cost, empty_space_teachers_cost, \
    free_hour
from model import Class, Classroom, Data


def load_data(server_data, teachers_empty_space, groups_empty_space, subjects_order):
    classes = {}
    classrooms = {}
    teachers = {}
    groups = {}
    class_list = []

    data = json.loads(server_data)

    for cl in data['courses']:
        new_group = [cl['year']]
        new_teacher = cl['user']['firstName'] + ' ' + cl['user']['lastName']

        if new_teacher not in teachers_empty_space:
            teachers_empty_space[new_teacher] = []

        new = Class(new_group, new_teacher, cl['name'], cl['type'], cl['duration'], cl['type'])
        for group in new_group:
            if group not in groups:
                groups[group] = len(groups)
                groups_empty_space[groups[group]] = []
        if new_teacher not in teachers:
            teachers[new_teacher] = len(teachers)
        class_list.append(new)

    random.shuffle(class_list)
    for cl in class_list:
        classes[len(classes)] = cl

    for room in data['rooms']:
        new = Classroom(room['number'], room['type'])
        classrooms[len(classrooms)] = new
    print(classrooms)

    for i in classes:
        cl = classes[i]
        classroom = cl.classrooms
        index_classrooms = []
        for index, c in classrooms.items():
            if c.type == classroom:
                index_classrooms.append(index)
        cl.classrooms = index_classrooms

        class_groups = cl.groups
        index_groups = []
        for name, index in groups.items():
            if name in class_groups:
                if (cl.subject, index) not in subjects_order:
                    subjects_order[(cl.subject, index)] = [-1, -1, -1]
                index_groups.append(index)
        cl.groups = index_groups

    return Data(groups, teachers, classes, classrooms)


def set_up(num_of_columns):
    w, h = num_of_columns, 60  # 5 (workdays) * 12 (work hours) = 60
    matrix = [[None for x in range(w)] for y in range(h)]
    free = []

    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            free.append((i, j))
    return matrix, free


def show_timetable(matrix):
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    for i in range(len(matrix[0])):
        if i == 0:
            print('{:17s} C{:6s}'.format('', '0'), end='')
        else:
            print('C{:6s}'.format(str(i)), end='')
    print()

    d_cnt = 0
    h_cnt = 0
    for i in range(len(matrix)):
        day = days[d_cnt]
        hour = hours[h_cnt]
        print('{:10s} {:2d} ->  '.format(day, hour), end='')
        for j in range(len(matrix[i])):
            print('{:6s} '.format(str(matrix[i][j])), end='')
        print()
        h_cnt += 1
        if h_cnt == 12:
            h_cnt = 0
            d_cnt += 1
            print()


def write_solution_to_file(matrix, data, filled, filepath, groups_empty_space, teachers_empty_space, subjects_order):
    f = open('solution_files/sol_' + filepath, 'w')

    f.write('-------------------------- STATISTICS --------------------------\n')
    cost_hard = check_hard_constraints(matrix, data)
    if cost_hard == 0:
        f.write('\nHard constraints satisfied: 100.00 %\n')
    else:
        f.write('Hard constraints NOT satisfied, cost: {}\n'.format(cost_hard))
    f.write('Soft constraints satisfied: {:.02f} %\n\n'.format(subjects_order_cost(subjects_order)))

    empty_groups, max_empty_group, average_empty_groups = empty_space_groups_cost(groups_empty_space)
    f.write('TOTAL empty space for all GROUPS and all days: {}\n'.format(empty_groups))
    f.write('MAX empty space for GROUP in day: {}\n'.format(max_empty_group))
    f.write('AVERAGE empty space for GROUPS per week: {:.02f}\n\n'.format(average_empty_groups))

    empty_teachers, max_empty_teacher, average_empty_teachers = empty_space_teachers_cost(teachers_empty_space)
    f.write('TOTAL empty space for all TEACHERS and all days: {}\n'.format(empty_teachers))
    f.write('MAX empty space for TEACHER in day: {}\n'.format(max_empty_teacher))
    f.write('AVERAGE empty space for TEACHERS per week: {:.02f}\n\n'.format(average_empty_teachers))

    f_hour = free_hour(matrix)
    if f_hour != -1:
        f.write('Free term -> {}\n'.format(f_hour))
    else:
        f.write('NO hours without classes.\n')

    groups_dict = {}
    for group_name, group_index in data.groups.items():
        if group_index not in groups_dict:
            groups_dict[group_index] = group_name
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    f.write('\n--------------------------- SCHEDULE ---------------------------')
    for class_index, times in filled.items():
        c = data.classes[class_index]
        groups = ' '
        for g in c.groups:
            groups += groups_dict[g] + ', '
        f.write('\n\nClass {}\n'.format(class_index))
        f.write('Teacher: {} \nSubject: {} \nGroups:{} \nType: {} \nDuration: {} hour(s)'
                .format(c.teacher, c.subject, groups[:len(groups) - 2], c.type, c.duration))
        room = str(data.classrooms[times[0][1]])
        f.write('\nClassroom: {:2s}\nTime: {}'.format(room[:room.rfind('-')], days[times[0][0] // 12]))
        for time in times:
            f.write(' {}'.format(hours[time[0] % 12]))
    f.close()


def show_statistics(matrix, data, subjects_order, groups_empty_space, teachers_empty_space):
    cost_hard = check_hard_constraints(matrix, data)
    if cost_hard == 0:
        print('Hard constraints satisfied: 100.00 %')
    else:
        print('Hard constraints NOT satisfied, cost: {}'.format(cost_hard))
    print('Soft constraints satisfied: {:.02f} %\n'.format(subjects_order_cost(subjects_order)))

    empty_groups, max_empty_group, average_empty_groups = empty_space_groups_cost(groups_empty_space)
    print('TOTAL empty space for all GROUPS and all days: ', empty_groups)
    print('MAX empty space for GROUP in day: ', max_empty_group)
    print('AVERAGE empty space for GROUPS per week: {:.02f}\n'.format(average_empty_groups))

    empty_teachers, max_empty_teacher, average_empty_teachers = empty_space_teachers_cost(teachers_empty_space)
    print('TOTAL empty space for all TEACHERS and all days: ', empty_teachers)
    print('MAX empty space for TEACHER in day: ', max_empty_teacher)
    print('AVERAGE empty space for TEACHERS per week: {:.02f}\n'.format(average_empty_teachers))

    f_hour = free_hour(matrix)
    if f_hour != -1:
        print('Free term ->', f_hour)
    else:
        print('NO hours without classes.')
