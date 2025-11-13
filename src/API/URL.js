const Urls = {
  // AUTH
  login: "Auth/login",
  register: "Auth/Register",
  instrctorRegister: "Auth/instructor-register",
  studentRegister: "Auth/student-register",
  verifyEmail: "Auth/verify-email",
  forgotPassword: "Auth/forgot-password",
  resetPassword: "Auth/reset-password",
  refreshToken: "Auth/refresh-token",
  // COURSE
  addCourse: "Course/add",
  getPendingCourses: "Course/pending-courses",
  getApprovedCourses: "Course/approved",
  getCourseById: "Course/",
  updateCourse: "Course/update",
  approveCourse: "Course/approve",
  deleteCourse: "Course/delete",
  // Profile
  EditProfile: "Profile/edit-",
  studentprofile: "Profile/student",
  instructorprofile: "Profile/instructor",
  adminprofile: "Profile/admin",
  getUserSettings: "userSetting/settings/",
  updateUserSettings: "userSetting/update/",
  // Notifications
  ReceiveNotifications: "Notification/user-receive",
  SendNotification: "Notification/user-send",
  MarkasReadNotifications: "Notification/user-read/",
  DeleteNotification: "Notification/user-delete",
  // Feedback
  AddFeedBack: "Others/Add-Feedback",
  GetAllFeedback: "Others/get-all-feedback",
  // Admin User Management
  Users: "Admin/get-all-user",
  userById: "Admin/get-user-by/",
  DeleteUsers: "Admin/delete-user-by",
  UpdateUsers: "Admin/update-user-by",
  ApproveUser: "Admin/approve-user-by",
  // Lesson
  AddLesson: "Lesson/add",
  UpdateLesson: "Lesson/update/",
  DeleteLesson: "Lesson/delete/",
  GetLessonById: "Lesson/",
  GetLessonByCourse: "Lesson/by-course/",
  CompleteLesson: "Lesson/complete/",
  LessonProgress: "Lesson/progress/",
};

export default Urls;
