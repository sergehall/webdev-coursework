// frontend/src/data/web-developer-courses.ts

export type Course = {
  code: string;
  title: string;
  units: number;
  description?: string;
  tags: string[];
  descriptionSummary?: string;
  skillsAdvisory?: string;
  transfersTo?: string;
  smcGeCategory?: string;
  prerequisite?: string;
  options?: Course[];
};

export const courses: Course[] = [
  {
    code: "CS 60",
    title: "Database Concepts and Applications",
    units: 3,
    tags: ["Available Online", "Program Requirement"],
    description:
      "This course introduces modern database concepts while emphasizing the relational database model. Topics include design methodologies, normalization of tables to reduce redundancies, supertypes and subtypes to reduce nulls, data integrity, referential integrity, and using locks and other techniques for concurrency control in a multi-user database. Factors that should be balanced during the design of a database are described. To document databases, entity relationship diagrams, relational schemas, and data dictionaries are described. Principles are applied by performing exercises using MySQL or other database management system. SQL and other languages are used to create and fill tables, retrieve data, and manipulate it by stored programs.",
    descriptionSummary:
      "Explores relational database design, normalization, data integrity, and concurrency control. Students apply concepts using MySQL, creating and managing data with SQL and stored programs.",
    skillsAdvisory: "CS 3",
    transfersTo: "CSU",
  },
  {
    code: "CS 70",
    title: "Network Fundamentals and Architecture",
    units: 3,
    tags: ["Available Online", "Program Requirement", "Gateway Course"],
    description:
      "This course offers a broad introduction to networking concepts and analyzes different network architectures. Introductory topics include network topologies, media and signaling, protocols, addressing, and distributed networks. The varied ways to connect computers are explored as are the resulting architectures. The course explores subnetting, both physical and virtual and internetworks are constructed in the lab. Server programs are introduced to demonstrate their signature socket-API structure. Specific real-world services such as the apache web server, BIND name server, NFS and Samba file system servers, DHCP address server, and others are discussed.",
    descriptionSummary:
      "Covers core networking concepts and architectures, including topologies, protocols, addressing, subnetting, and distributed systems. Includes hands-on labs with server tools and real-world services.",
    skillsAdvisory: "One programming course.",
    transfersTo: "CSU",
  },
  {
    code: "CS 79A",
    title: "Introduction to Cloud Computing",
    units: 3,
    tags: ["Available Online", "Program Requirement"],
    description:
      "This course introduces cloud computing which shifts information systems from on-premises computing infrastructure to highly scalable internet architectures. The course provides a solid foundation of cloud computing technologies and provides students with the understanding required to effectively evaluate and assess the business and technical benefits of cloud computing and cloud applications. Students analyze a variety of cloud services (storage, servers and software applications) and cloud providers. Case studies will be used to examine various industry cloud practices and applications. The course also surveys cloud careers and discusses industry demand for cloud skills.",
    descriptionSummary:
      "Introduces cloud computing and its shift from local infrastructure to scalable internet-based systems. Covers cloud technologies, services, providers, career paths, and industry demand.",
    prerequisite: "CS 3",
    transfersTo: "CSU",
  },
  {
    code: "CS 80",
    title: "Internet Programming",
    units: 3,
    tags: ["Available Online", "Program Requirement"],
    description:
      "This course covers the basic technologies used to program Web-based applications. Topics include: HTML5, Cascading Style Sheets (CSS), XML and JavaScript, along with a basic survey of the latest extensions on JS.",
    skillsAdvisory: "CS 3",
    smcGeCategory: "Area IV-B: Language and Rationality (Group B) Option 2",
    transfersTo: "CSU",
  },
  {
    code: "CS 81",
    title: "Javascript Programming",
    units: 3,
    tags: ["Available Online", "Program Requirement"],
    description:
      "This introductory programming course teaches the fundamentals of computer programming with the JavaScript language, the standard for client-side Web programming. It offers a thorough treatment of programming concepts with programs that yield visible or audible results in Web pages and Web-based applications. It shows how to use Core and Client-Side JavaScript and the Document Object Model to build interactive, high-performance Web sites.",
    descriptionSummary:
      "Introduces core programming concepts using JavaScript for client-side web development. Covers the DOM and building interactive, high-performance websites with visual or audible outputs.",
    skillsAdvisory: "CS 3",
    smcGeCategory: "Area IV-B: Language and Rationality (Group B) Option 2",
    transfersTo: "CSU",
  },
  {
    code: "",
    title: "One Server Programming Course",
    units: 3,
    tags: ["Required Course"],
    options: [
      {
        code: "CS 82",
        title: "ASP.NET Programming in C#",
        units: 3,
        tags: [],
        description:
          "Server-side Web programming allows programmers to create content and process data supplied in Web forms to create websites. These applications process data submitted from Web forms and access backend databases to dynamically generate Web pages. Students will design and write web pages using ASP 2.0 (Active Server Pages), Visual Studio. NET and the C# programming language.",
        descriptionSummary:
          "Covers server-side web programming using ASP.NET and C#, focusing on processing form data and generating dynamic web pages with backend database access in Visual Studio.",
        skillsAdvisory: "CS 33",
        smcGeCategory: "Area IV-B: Language and Rationality (Group B) Option 2",
        transfersTo: "CSU",
      },
      {
        code: "CS 83",
        title: "Server-Side Java Web Programming",
        units: 3,
        tags: [],
        description:
          "This course teaches how to design and write applications that extend Web servers. These applications process data submitted from Web forms and access backend databases to dynamically generate Web pages. This course covers the Java Servlets and JavaServer Pages (JSP) server-side technologies.",
        descriptionSummary:
          "Teaches server-side Java development using Servlets and JSP to handle form data, access databases, and generate dynamic web pages.",
        skillsAdvisory: "CS 55 and CS 81",
        smcGeCategory: "Area IV-B: Language and Rationality (Group B) Option 2",
        transfersTo: "CSU",
      },
      {
        code: "CS 83R",
        title: "Server-Side Ruby Web Programming",
        units: 3,
        tags: ["Online Course"],
        description:
          "This course teaches how to design and write applications utilizing Ruby on Rails, an open-source web application framework based on the Ruby programming language. In this course, students will create applications that gather information from a web server, query databases and render results.",
        descriptionSummary:
          "Covers building web applications with Ruby on Rails, focusing on server interaction, database queries, and rendering dynamic content.",
        skillsAdvisory:
          "CS 60 and CS 80 and (CS 15 or CS 52 or CS 53A or CS 55)",
        smcGeCategory: "Area IV-B: Language and Rationality (Group B) Option 2",
        transfersTo: "CSU",
      },
      {
        code: "CS 85",
        title: "PHP Programming",
        units: 3,
        tags: ["Online Course"],
        description:
          'This course teaches how to design and write applications that extend Web servers. These applications process data submitted from Web forms and access back-end databases to dynamically generate Web pages. This course covers the PHP server-side technology. PHP, which stands for "PHP: Hypertext Preprocessor" is a widely-used, Open Source, general-purpose scripting language that is especially suited for Web development and can be embedded into HTML.',
        descriptionSummary:
          "Introduces PHP for server-side web development, focusing on processing form data, accessing databases, and generating dynamic web pages with embedded PHP in HTML.",
        skillsAdvisory: "CS 81",
        smcGeCategory: "Area IV-B: Language and Rationality (Group B) Option 2",
        transfersTo: "CSU",
      },
    ],
  },
  {
    code: "CS 87A",
    title: "Python Programming",
    units: 3,
    tags: [
      "Available Online",
      "Appropriate for Intersession",
      "Program Requirement",
    ],
    description:
      "This course introduces the Python programming language. Students will learn how to write programs dealing in a wide range of application domains. Topics covered include the language syntax, IDE, control flow, strings, I/O, classes and regular expressions. Students may use either a PC (Windows) or a Mac (Linux) to complete their programming assignments.",
    descriptionSummary:
      "Introduces Python programming, covering syntax, control flow, I/O, strings, classes, and regular expressions across various application domains using Windows or Mac environments.",
    skillsAdvisory: "CS 3",
    transfersTo: "UC/CSU",
  },
  {
    code: "",
    title: "One Security Course",
    units: 3,
    tags: ["Required Course"],
    options: [
      {
        code: "CS 73A",
        title: "Fundamentals of Computer Security",
        units: 3,
        tags: ["Online Course"],
        description:
          "In this introductory course students will learn how to defend and protect critical computer assets from various security threats including computer worms and viruses. This course will describe fundamental techniques and principles for modeling and analyzing security. Students will learn how to express security requirements, translate requirements into policies, implement mechanisms that enforce policy, and ensure that these policies are effective. Current industry best practices for safeguarding computer resources will be discussed. Various case studies will outline the typical way that security failures get exploited by attackers and how these attacks can be discovered, understood, and countered.",
        descriptionSummary:
          "Covers fundamental security principles, threat defense, policy enforcement, and industry best practices. Includes case studies on real-world attacks and methods for detection and prevention.",
        skillsAdvisory: "CS 3 and CS 70",
        transfersTo: "CSU",
      },
      {
        code: "CS 73B",
        title: "Computer Forensics Fundamentals",
        units: 3,
        tags: ["Online Course"],
        description:
          "In this course, students will learn the principles and techniques of network forensics investigation and the use of available forensics tools in the list of the International Association of Computer Investigative Specialists (IACIS) certification. This course explores security incidents and intrusions, including identifying and categorizing incidents, responding to incidents, using log analysis, analyzing network traffic, applying various tools, and creating an incident response team. Students will also learn about ethical implications of computer forensics reporting and the laws regarding computer evidence.",
        descriptionSummary:
          "Covers network forensics principles, tools, and incident response techniques. Includes log and traffic analysis, legal considerations, and ethical issues in digital evidence reporting.",
        skillsAdvisory: "CS 73A",
        transfersTo: "CSU",
      },
      {
        code: "CS 73C",
        title: "Cybersecurity and Ethical Hacking",
        units: 3,
        tags: ["Online Course"],
        description:
          "This course provides an in-depth understanding of how to protect IT infrastructure. The course combines ethical hacking methodologies with the hands-on application of security tools to secure computer and other digital systems. Students are introduced to common countermeasures that effectively reduce and/or mitigate attacks. In addition, the course covers what an ethical hacker is and how important it is to protect data from cyber attacks. Students will review TCP/IP concepts and practice footprinting, scanning, enumeration, exploitation, and social engineering.",
        descriptionSummary:
          "Focuses on protecting IT systems through ethical hacking and security tools. Covers countermeasures, TCP/IP, and techniques like scanning, exploitation, and social engineering.",
        skillsAdvisory: "CS 73A",
        transfersTo: "CSU",
      },
      {
        code: "CS 73L",
        title: "Cybersecurity Literacy",
        units: 3,
        tags: ["Online Course"],
        description:
          "Technology, through the use of cellphones, tablets, desktops and embedded systems, surrounds us everywhere and is a part of our daily life. With the ubiquity of device use, and global-scale data transfers, users are vulnerable to the temptations of cyber-criminals. In this course, students learn how to use technology safely. The course also introduces basic concepts of cybersecurity and explores careers in this field. This course is intended for any non-major student who wants to be a savvy user in the world today.",
        descriptionSummary:
          "Introduces basic cybersecurity concepts and safe technology use for everyday life. Designed for non-majors to build awareness and explore careers in the cybersecurity field.",
        transfersTo: "CSU",
      },
      {
        code: "CS 79D",
        title: "Security in Amazon Web Services",
        units: 3,
        tags: ["Online Course"],
        description:
          "This course focuses on protecting the confidentiality, integrity and availability of computing systems and data.Students learn how Amazon Web Service (AWS) uses redundant and layered controls, continuous validation and testing, and a substantial amount of automation to ensure the underlying infrastructure is continuously monitored and protected. Students examine the AWS Shared Responsibility Model and access the AWS Management Console to learn more about security tools and features provided by the AWS platform.",
        descriptionSummary:
          "Focuses on securing systems and data in AWS. Covers the Shared Responsibility Model, AWS security tools, and how automation and layered controls protect cloud infrastructure.",
        skillsAdvisory: "CS 79A",
        transfersTo: "CSU",
      },
    ],
  },
  {
    code: "",
    title: "One Cloud Skills Course",
    units: 3,
    tags: ["Program Requirement"],
    options: [
      {
        code: "CS 77A",
        title: "Salesforce Administration Essentials",
        units: 3,
        tags: ["Available Online"],
        description:
          "This course introduces students to Salesforce, the industry-leading customer relationship management system. Topics include: data model and navigation; setting up company profiles, user interface and security. Students will create customized records, manage data, run reports, navigate system apps and other applications including personalizing the program to suit various business needs.",
        descriptionSummary:
          "Introduces Salesforce CRM fundamentals, including data models, UI setup, security, and customization. Students learn to manage data, run reports, and tailor the system to business needs.",
        skillsAdvisory: "CIS 1 or CS 3",
        transfersTo: "CSU",
      },
      {
        code: "CS 77B",
        title: "Salesforce Developer Essentials",
        units: 3,
        tags: ["Available Online"],
        description:
          "This course covers how to create applications using the Salesforce platform services and tools. Topics include designing and managing data models, configuring application security, designing user interfaces and customizing the application for mobile user and Lightning users. It also focuses on VisualForce to develop custom applications that make use of the Model-View-Controller paradigm by coding in Apex, using Lightning Components and the Salesforce Object Query Language (SOQL).",
        descriptionSummary:
          "Covers app development on the Salesforce platform using Apex, VisualForce, Lightning Components, and SOQL. Focuses on data modeling, UI design, security, and customization for various users.",
        skillsAdvisory: "CS 77A and CS 55",
        smcGeCategory: "Area IV-B: Language and Rationality (Group B) Option 2",
        transfersTo: "CSU",
      },
      {
        code: "CS 79B",
        title: "Database Essentials in Amazon Web Services",
        units: 3,
        tags: ["Available Online"],
        description:
          "This course addresses cloud database management which supports a number of different approaches for storing data. In the course, students define, operate and scale both SQL and noSQL data storage solutions. Principles are applied by performing exercises using Amazon RDS and SQL to create and fill tables, retrieve and manipulate data. Object-based APIs are used to serialize objects to Amazon DynamoDB for noSQL solutions. Topics include automated backups, transaction logs, restoration and retention.",
        descriptionSummary:
          "Covers cloud database management using SQL and NoSQL. Students work with Amazon RDS and DynamoDB, applying concepts like data operations, serialization, backups, and recovery techniques.",
        skillsAdvisory: "CS 79A",
        transfersTo: "CSU",
      },
      {
        code: "CS 79C",
        title: "Compute Engines in Amazon Web Services",
        units: 3,
        tags: ["Available Online"],
        description:
          "In this course, students explore how cloud computing systems are built using a common set of core technologies, algorithms, and design principles centered around distributed systems. Students will use the Amazon Web Services (AWS) Management Console to provision, load-balance and scale their applications using the Elastic Compute Cloud (EC2) and the AWS Elastic Beanstalk. The course discusses, from a developer perspective, the most important reasons for using AWS and examines the underlying design principles of scalable cloud applications.",
        descriptionSummary:
          "Explores cloud architecture using AWS services like EC2 and Elastic Beanstalk. Focuses on distributed systems, scalability, and core design principles for building cloud-native applications.",
        skillsAdvisory: "CS 79A and (CS 55 or CS 87A or CS 83R or CS 85)",
        transfersTo: "CSU",
      },
      {
        code: "CS 79E",
        title: "Best Practices in Amazon Web Services",
        units: 3,
        tags: ["Available Online"],
        description:
          "In this advanced course, students will learn how to use the AWS Well-Architected framework that has been developed as a guideline to cloud architects to implement the most secure, high-performing, resilient and efficient infrastructure possible for their applications. Using case studies and class projects, students will apply the five pillars of operational excellence, security, reliability, performance efficiency and cost optimization on AWS architected infrastructures.",
        descriptionSummary:
          "Teaches the AWS Well-Architected Framework and its five pillars: operational excellence, security, reliability, performance efficiency, and cost optimization through case studies and projects.",
        skillsAdvisory: "CS 79C and CS 79D",
        transfersTo: "CSU",
      },
      {
        code: "CS 79Y",
        title: "Microsoft Azure Database Essentials",
        units: 3,
        tags: ["Available Online"],
        description:
          "In this course, students will learn to deploy relational and non-relational databases in Azure. Students will define, operate and scale both SQL and noSQL data storage solutions. Principles are applied by performing exercises using the Azure SQL Database service as well as Azure Storage Explorer. Students will store, manage and analyze data in all the different storage options offered in Azure including blob storage, file storage, table storage, queue storage, Cognos DB and Azure Data Lakes.",
        descriptionSummary:
          "Covers deployment and management of SQL and NoSQL databases in Azure. Students use Azure SQL Database and Storage Explorer to work with various storage types including blobs, tables, and Data Lakes.",
        skillsAdvisory: "CS 79A and CS 79Z",
        transfersTo: "CSU",
      },
      {
        code: "CS 79Z",
        title: "Microsoft Azure Essentials",
        units: 3,
        tags: ["Available Online"],
        description:
          "In this course, students will gain the skillset needed to implement Infrastructure as a Service on the Azure cloud platform. The course will cover how to assess and plan a cloud migration from on premises infrastructure to Azure. Students will learn how to manage Azure resources, including deployment and configuration of virtual machines, virtual networks, storage accounts, and Azure active directory services to manage user and groups. Students will also learn how to manage a pool of nodes using batch jobs.",
        descriptionSummary:
          "Teaches how to implement Infrastructure as a Service (IaaS) on Azure. Covers cloud migration, VM and network setup, storage management, Azure AD, and batch job processing.",
        skillsAdvisory: "CS 79A",
        transfersTo: "CSU",
      },
      {
        code: "CIS 67",
        title: "WordPress",
        units: 3,
        tags: ["Available Online"],
        description:
          "WordPress is the world’s most popular Content Management System (CMS) platform, powering personal blogs, some of the largest community/society websites, eCommerce web stores and fan sites built with cutting edge technology. This course provides students with the knowledge, skills, and hands-on experience to create, enhance, and maintain a successful WordPress site. Students learn the necessary skills to install WordPress, design, and build a WordPress website, create and sustain a blog, populate the site with content aggregation, and build a content management system. Students will be able to edit the site, integrate analytics, optimize for Search Engine Optimization (SEO), and build for multiple contributors. The design and integration of WordPress themes, widgets, and plugins will be emphasized.",
        descriptionSummary:
          "Covers building and managing WordPress sites, including installation, theme design, content creation, SEO, analytics, and multi-user setup using widgets and plugins.",
        skillsAdvisory: "CIS 50",
        transfersTo: "CSU",
      },
    ],
  },
];
