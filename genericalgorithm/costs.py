def subjects_order_cost(subjects_order):
    cost = 0
    total = 0

    for (subject, group_index), times in subjects_order.items():

        if times[0] != -1 and times[1] != -1:
            total += 1
            if times[0] > times[1]:
                cost += 1

        if times[0] != -1 and times[2] != -1:
            total += 1
            if times[0] > times[2]:
                cost += 1

        if times[1] != -1 and times[2] != -1:
            total += 1
            if times[1] > times[2]:
                cost += 1

    if total != 0:
        return 100 * (total - cost) / total
    else:
        return 100 * (total - cost) / 50


def empty_space_groups_cost(groups_empty_space):
    cost = 0
    max_empty = 0

    for group_index, times in groups_empty_space.items():
        times.sort()
        empty_per_day = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}

        for i in range(1, len(times) - 1):
            a = times[i - 1]
            b = times[i]
            diff = b - a
            if a // 12 == b // 12 and diff > 1:
                empty_per_day[a // 12] += diff - 1
                cost += diff - 1

        for key, value in empty_per_day.items():
            if max_empty < value:
                max_empty = value

    return cost, max_empty, cost / len(groups_empty_space)


def empty_space_teachers_cost(teachers_empty_space):
    cost = 0
    max_empty = 0

    for teacher_name, times in teachers_empty_space.items():
        times.sort()
        empty_per_day = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}

        for i in range(1, len(times) - 1):
            a = times[i - 1]
            b = times[i]
            diff = b - a
            if a // 12 == b // 12 and diff > 1:
                empty_per_day[a // 12] += diff - 1
                cost += diff - 1

        for key, value in empty_per_day.items():
            if max_empty < value:
                max_empty = value

    return cost, max_empty, cost / len(teachers_empty_space)


def free_hour(matrix):
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    for i in range(len(matrix)):
        exists = True
        for j in range(len(matrix[i])):
            field = matrix[i][j]
            if field is not None:
                exists = False

        if exists:
            return '{}: {}'.format(days[i // 12], hours[i % 12])

    return -1


def hard_constraints_cost(matrix, data):
    cost_class = {}
    for c in data.classes:
        cost_class[c] = 0

    cost_classrooms = 0
    cost_teacher = 0
    cost_group = 0
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            field = matrix[i][j]
            if field is not None:
                c1 = data.classes[field]

                if j not in c1.classrooms:
                    cost_classrooms += 1
                    cost_class[field] += 1

                for k in range(j + 1, len(matrix[i])):
                    next_field = matrix[i][k]
                    if next_field is not None:
                        c2 = data.classes[next_field]

                        if c1.teacher == c2.teacher:
                            cost_teacher += 1
                            cost_class[field] += 1

                        g1 = c1.groups
                        g2 = c2.groups
                        for g in g1:
                            if g in g2:
                                cost_group += 1
                                cost_class[field] += 1

    total_cost = cost_teacher + cost_classrooms + cost_group
    return total_cost, cost_class, cost_teacher, cost_classrooms, cost_group


def check_hard_constraints(matrix, data):
    overlaps = 0
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            field = matrix[i][j]
            if field is not None:
                c1 = data.classes[field]

                if j not in c1.classrooms:
                    overlaps += 1

                for k in range(len(matrix[i])):
                    if k != j:
                        next_field = matrix[i][k]
                        if next_field is not None:
                            c2 = data.classes[next_field]

                            if c1.teacher == c2.teacher:
                                overlaps += 1

                            g1 = c1.groups
                            g2 = c2.groups
                            for g in g1:
                                if g in g2:
                                    overlaps += 1

    return overlaps
