from domain import (
  Class,
  Course,
  Department,
  Instructor,
  MeetingTime,
  Room
)
import json

class Data(object):
  def __init__(self, Data):
    self.data = json.loads(Data)
    self.rooms = []
    self.instructors = []
    self.courses = []
    self.depts = []
    self.meeting_times = []
    self.number_of_classes = None
    self.initialize()
  
  def initialize(self):
    # create rooms
    print('AICI')
    rooms =  self.data["rooms"]
    courses =  self.data["courses"]
    teachers =  self.data["teachers"]
    depts =  self.data["depts"]
    meeting_times =  self.data["times"]

    for i in rooms:
      room = Room(number = i["number"], seating_capacity=i["capacity"])
      self.rooms.append(room)

    for i in meeting_times:
      time = MeetingTime(id = i["id"], time=i["time"])
      self.meeting_times.append(time)


    for i in teachers:
      teacher = Instructor(id = i["id"], name=i["firstName"])
      self.instructors.append(teacher)

    for i in courses:
      instructors = []
      # for j in self.instructors:
      #   if j["id"]==i["user"]["id"]:
      #     instructors.append(j)
      course = Course(number=i["id_class"], name=i["name"], max_number_of_students=25, instructors=[self.instructors[0]])
      self.courses.append(course)
    

    # # create courses
    # course1 = Course(number="C1", name="Graphs Algorithms", max_number_of_students=25, instructors=[instructor1, instructor2])
    # course2 = Course(number="C2", name="Machine Learning", max_number_of_students=35, instructors=[instructor1, instructor2, instructor3])
    # course3 = Course(number="C3", name="Databases", max_number_of_students=25, instructors=[instructor1, instructor2])
    # course4 = Course(number="C4", name="Python", max_number_of_students=30, instructors=[instructor3, instructor4])
    # course5 = Course(number="C5", name="Java", max_number_of_students=35, instructors=[instructor4])
    # course6 = Course(number="C6", name="Math", max_number_of_students=45, instructors=[instructor1, instructor3])
    # course7 = Course(number="C7", name="Computer Networks", max_number_of_students=45, instructors=[instructor2, instructor4])

    # self.courses = [course1, course2, course3, course4, course5, course6, course7]

    # create departments
    department1 = Department(name="Year 1", courses=[course1, course3])
    department2 = Department(name="Year 2", courses=[course2, course4, course5])
    department3 = Department(name="Year 3", courses=[course6, course7])

    self.depts = [department1, department2, department3]

    # define the number of classes
    self.number_of_classes = sum([len(x.courses) for x in self.depts])
