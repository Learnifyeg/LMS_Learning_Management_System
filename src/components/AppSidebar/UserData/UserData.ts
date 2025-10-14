import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const sidebarData = {
  student: {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
      items: [
        { title: "Dashboard", url: "/StudentLayout/StuDashboard" },
        { title: "Profile", url: "/StudentLayout/StuProfile" },
        { title: "Notifications", url: "/UserLayout/Notifications" },
      ],
    },
    teams: [
      {
        name: "shadcn",
        logo: GalleryVerticalEnd,
        role: "Student",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/StudentLayout/StuDashboard",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Profile",
        url: "/StudentLayout/StuProfile",
        icon: Settings2,
      },
      {
        title: "Certificates",
        url: "/StudentLayout/StuMyCertificates",
        icon: Frame,
      },
      {
        title: "Courses",
        url: "#",
        icon: BookOpen,
        items: [
          { title: "My Courses", url: "/StudentLayout/MyCourses" },
          { title: "Saved Courses", url: "/StudentLayout/StuSavedCourses" },
          { title: "Course Details", url: "/StudentLayout/StuCourseDetails" },
        ],
      },
      {
        title: "Quiz",
        url: "#",
        icon: Bot,
        items: [
          { title: "Saved Quizzes", url: "/StudentLayout/StuQuizPage" },
          { title: "Quiz Results", url: "/StudentLayout/StuQuizResult" },
        ],
      },

      {
        title: "Payments",
        url: "#",
        icon: PieChart,
        items: [
          { title: "Checkout", url: "/StudentLayout/StuCheckout" },
          { title: "Invoice", url: "/StudentLayout/StuInvoice" },
          { title: "Cart", url: "/StudentLayout/StuShoppingCart" },
        ],
      },
    ],
    Setting: [
      {
        name: "Settings",
        url: "#",
        icon: PieChart,
        items: [
          { title: "Settings", url: "/UserLayout/SettingPage" },
          { title: "Notifications", url: "/UserLayout/Notifications" },
          { title: "Terms of Use", url: "/UserLayout/TermsOfUse" },
        ],
      },
      {
        name: "Support",
        url: "#",
        icon: Frame,
        items: [
          { title: "Help", url: "/UserLayout/HelpPage" },
          { title: "Contact Us", url: "/UserLayout/ContactUs" },
          { title: "Send Feedback", url: "/UserLayout/SendFeedback" },
        ],
      },
    ],
  },

  instructor: {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
      items: [
        { title: "Dashboard", url: "/InstructorLayout/InstrDashboard" },
        { title: "Profile", url: "/InstructorLayout/InstrProfile" },
        { title: "Notifications", url: "/UserLayout/Notifications" },
      ],
    },
    teams: [
      {
        name: "shadcn",
        logo: GalleryVerticalEnd,
        role: "Instructor",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/InstructorLayout/InstrDashboard",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Profile",
        url: "/InstructorLayout/InstrProfile",
        icon: Settings2,
      },
      // {
      //   title: "Certificates",
      //   url: "/InstructorLayout/InstrCertificates",
      //   icon: Frame,
      // },
      {
        title: "Courses",
        url: "#",
        icon: BookOpen,
        items: [
          { title: "My Courses", url: "/InstructorLayout/InstCourses" },
          { title: "AllStudents", url: "/InstructorLayout/AllStudents" },
        ],
      },
      {
        title: "Quiz",
        url: "#",
        icon: Bot,
        items: [
          { title: "Quizzes", url: "/InstructorLayout/AllQuizzes" },
          { title: "Create Quiz", url: "/InstructorLayout/StuQuizResult" },
        ],
      },

      {
        title: "Payments",
        url: "#",
        icon: PieChart,
        items: [
          // { title: "Checkout", url: "/StudentLayout/StuCheckout" },
          // { title: "Invoice", url: "/StudentLayout/StuInvoice" },
          // { title: "Cart", url: "/StudentLayout/StuShoppingCart" },
        ],
      },
    ],
    Setting: [
      {
        name: "Settings",
        url: "#",
        icon: PieChart,
        items: [
          { title: "Settings", url: "/UserLayout/SettingPage" },
          { title: "Notifications", url: "/UserLayout/Notifications" },
          { title: "Terms of Use", url: "/UserLayout/TermsOfUse" },
        ],
      },
      {
        name: "Support",
        url: "#",
        icon: Frame,
        items: [
          { title: "Help", url: "/UserLayout/HelpPage" },
          { title: "Contact Us", url: "/UserLayout/ContactUs" },
          { title: "Send Feedback", url: "/UserLayout/SendFeedback" },
        ],
      },
    ],
  },

  admin: {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
      items: [
        { title: "Dashboard", url: "/AdminLayout/AdminDashboard" },
        { title: "Profile", url: "/AdminLayout/AdminProfile" },
        { title: "Notifications", url: "/UserLayout/Notifications" },
      ],
    },
    teams: [
      {
        name: "shadcn",
        logo: GalleryVerticalEnd,
        role: "Admin",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/AdminLayout/AdminDashboard",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Profile",
        url: "/AdminLayout/AdminProfile",
        icon: Settings2,
      },
      {
        title: "Certificates",
        url: "/StudentLayout/StuMyCertificates",
        icon: Frame,
      },
      {
        title: "Course Management",
        url: "/AdminLayout/CourseManagement",
        icon: BookOpen,
        // items: [
        //   { title: "My Courses", url: "/StudentLayout/MyCourses" },
        //   { title: "Saved Courses", url: "/StudentLayout/StuSavedCourses" },
        //   { title: "Course Details", url: "/StudentLayout/StuCourseDetails" },
        // ],
      },
      {
        title: "User Management",
        url: "/AdminLayout/UserManagement",
        icon: BookOpen,
        // items: [
        //   { title: "My Courses", url: "/StudentLayout/MyCourses" },
        //   { title: "Saved Courses", url: "/StudentLayout/StuSavedCourses" },
        //   { title: "Course Details", url: "/StudentLayout/StuCourseDetails" },
        // ],
      },
      // {
      //   title: "Quiz",
      //   url: "#",
      //   icon: Bot,
      //   items: [
      //     { title: "Saved Quizzes", url: "/StudentLayout/StuQuizPage" },
      //     { title: "Quiz Results", url: "/StudentLayout/StuQuizResult" },
      //   ],
      // },

      {
        title: "Payments",
        url: "/AdminLayout/AdminPayments",
        icon: PieChart,
        // items: [
        //   { title: "Payments", url: "/AdminLayout/AdminPayments" },
        //   { title: "Invoice", url: "/StudentLayout/StuInvoice" },
        //   { title: "Cart", url: "/StudentLayout/StuShoppingCart" },
        // ],
      },
    ],
    Setting: [
      {
        name: "Settings",
        url: "#",
        icon: PieChart,
        items: [
          { title: "Settings", url: "/UserLayout/SettingPage" },
          { title: "Notifications", url: "/UserLayout/Notifications" },
          { title: "Terms of Use", url: "/UserLayout/TermsOfUse" },
        ],
      },
      {
        name: "Support",
        url: "#",
        icon: Frame,
        items: [
          { title: "Help", url: "/UserLayout/HelpPage" },
          { title: "Contact Us", url: "/UserLayout/ContactUs" },
          { title: "Feedback", url: "/UserLayout/SendFeedback" },
        ],
      },
    ],
  },
};

// export const sidebarData = {
// user: {
//   name: "shadcn",
//   email: "m@example.com",
//   avatar: "/avatars/shadcn.jpg",
//   items: [
//       { title: "Dashboard", url: "/StudentLayout/StuDashboard" },
//       { title: "Profile", url: "/StudentLayout/StuProfile" },
//       { title: "Notifications", url: "/UserLayout/Notifications" },
//     ],
// },
// teams: [
//   {
//     name: "Acme Inc",
//     logo: GalleryVerticalEnd,
//     plan: "Enterprise",
//   },
//   {
//     name: "Acme Corp.",
//     logo: AudioWaveform,
//     plan: "Startup",
//   },
//   {
//     name: "Evil Corp.",
//     logo: Command,
//     plan: "Free",
//   },
// ],
// navMain: [
//   {
//     title: "Dashboard",
//     url: "/StudentLayout/StuDashboard",
//     icon: SquareTerminal,
//     isActive: true,
//   },
//   {
//     title: "Profile",
//     url: "/StudentLayout/StuProfile",
//     icon: Settings2,
//   },
//   {
//     title: "Certificates",
//     url: "/StudentLayout/StuMyCertificates",
//     icon: Frame,
//   },
//   {
//     title: "Courses",
//     url: "#",
//     icon: BookOpen,
//     items: [
//       { title: "My Courses", url: "/StudentLayout/MyCourses" },
//       { title: "Saved Courses", url: "/StudentLayout/StuSavedCourses" },
//       { title: "Course Details", url: "/StudentLayout/StuCourseDetails" },
//     ],
//   },
//   {
//     title: "Quiz",
//     url: "#",
//     icon: Bot,
//     items: [
//       { title: "Saved Quizzes", url: "/StudentLayout/StuQuizPage" },
//       { title: "Quiz Results", url: "/StudentLayout/StuQuizResult" },
//     ],
//   },

//   {
//     title: "Payments",
//     url: "#",
//     icon: PieChart,
//     items: [
//       { title: "Checkout", url: "/StudentLayout/StuCheckout" },
//       { title: "Invoice", url: "/StudentLayout/StuInvoice" },
//       { title: "Cart", url: "/StudentLayout/StuShoppingCart" },
//     ],
//   },
// ],
// Setting: [
//   {
//     name: "Settings",
//     url: "#",
//     icon: PieChart,
//     items: [
//       { title: "Settings", url: "/UserLayout/SettingPage" },
//       { title: "Notifications", url: "/UserLayout/Notifications" },
//       { title: "Terms of Use", url: "/UserLayout/TermsOfUse" },
//     ],
//   },
//   {
//     name: "Support",
//     url: "#",
//     icon: Frame,
//     items: [
//       { title: "Help", url: "/UserLayout/HelpPage" },
//       { title: "Contact Us", url: "/UserLayout/ContactUs" },
//       { title: "Send Feedback", url: "/UserLayout/SendFeedback" },
//     ],
//   },
// ],
// };
