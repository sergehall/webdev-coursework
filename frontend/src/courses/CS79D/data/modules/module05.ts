import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule05Blueprint = {
  id: 5,
  title: "Secure the OS, PiHole VPN, Inspector, and Trusted Advisor",
  weekLabel: "Week 5",
  dateLabel: "May 18-24, 2026",
  overview:
    "Week 5 is prepared around the Canvas deliverable list: a discussion, four hands-on Lab 4 sections, and the Inspector & Trusted Advisor quiz. The detailed writeups can be dropped into each block after the final notes, screenshots, and quiz data are ready.",
  topicLine:
    "Scheduled topic: Secure the OS, PiHole VPN, Amazon Inspector, and AWS Trusted Advisor",
  focusAreas: [
    "Operating system security hardening",
    "PiHole VPN deployment and network filtering",
    "Amazon Inspector vulnerability assessment",
    "AWS Trusted Advisor security recommendations",
    "Evidence collection for Canvas lab submissions",
  ],
  objectivesAligned: [
    "Document OS-level hardening steps and validation evidence",
    "Prepare VPN and DNS filtering notes for the PiHole lab",
    "Capture Inspector scan setup, findings, and remediation notes",
    "Summarize Trusted Advisor security checks and recommended actions",
  ],
  outcomeAlignment: [
    "Show practical host security configuration evidence",
    "Explain how network filtering and VPN access improve security posture",
    "Use AWS-native assessment tools to identify account and workload risks",
  ],
  syllabusContext: [
    "Module 5 of 8 — hands-on security validation and advisory checks",
    "All visible Canvas deliverables are due May 24, 2026",
    "This module is staged so final screenshots, prompts, and answers can be added incrementally",
  ],
  starterTasks: [
    "Add the Week 5 discussion prompt and final response",
    "Attach Secure the OS lab notes and screenshots",
    "Attach PiHole VPN lab notes and screenshots",
    "Attach Inspector lab findings and screenshots",
    "Attach Trusted Advisor findings and screenshots",
    "Add quiz questions and answers when available",
  ],
  artifacts: [
    "Discussion: Week 5 response",
    "Lab 4: Secure the OS evidence",
    "Lab 4b: PiHole VPN evidence",
    "Lab 4c: Inspector findings evidence",
    "Lab 4d: Trusted Advisor findings evidence",
    "Quiz: Inspector & Trusted Advisor question set",
  ],
  importantDates: [
    "May 24 — Discussion: Week 5 (5 pts)",
    "May 24 — Lab 4: Secure the OS (20 pts)",
    "May 24 — Lab 4b: PiHole VPN (20 pts)",
    "May 24 — Lab 4c: Inspector (20 pts)",
    "May 24 — Lab 4d: Trusted Advisor (20 pts)",
    "May 24 — Quiz: Inspector & Trusted Advisor (10 pts)",
  ],
  assessmentContext: [
    "Discussion: Week 5 — 5 pts",
    "Lab 4: Secure the OS — 20 pts",
    "Lab 4b: PiHole VPN — 20 pts",
    "Lab 4c: Inspector — 20 pts",
    "Lab 4d: Trusted Advisor — 20 pts",
    "Quiz: Inspector & Trusted Advisor — 10 pts",
    "Total Week 5 — 95 pts",
  ],
  milestone:
    "All Week 5 blocks are staged for final Canvas content, screenshots, and quiz data",
  serviceHighlights: [
    {
      service: "Secure the OS",
      pages: "Host security",
      notes:
        "Prepared for OS hardening steps, configuration evidence, and final validation screenshots.",
    },
    {
      service: "PiHole VPN",
      pages: "Network filtering and remote access",
      notes:
        "Prepared for PiHole, VPN setup notes, DNS filtering evidence, and connectivity checks.",
    },
    {
      service: "Amazon Inspector",
      pages: "Vulnerability management",
      notes:
        "Prepared for scan configuration, findings screenshots, and remediation summary.",
    },
    {
      service: "AWS Trusted Advisor",
      pages: "Security recommendations",
      notes:
        "Prepared for security check results, advisory findings, and follow-up actions.",
    },
  ],
  textTasks: [
    {
      id: "discussion-week5",
      title: "Discussion: Week 5",
      objective:
        "Respond to the Week 5 discussion questions about AWS Trusted Advisor, automated vulnerability scanning, and the role of manual security review.",
      tasks: [
        "1. How would you use Trusted Advisor to reduce AWS costs in a real-world business environment?",
        "2. Why is automated vulnerability scanning important in modern cloud infrastructure?",
        "3. Do you think automation in security such as Inspector can fully replace manual reviews? Why or why not?",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas discussion board",
        "Due: May 24, 2026",
        "5 points",
      ],
      whyItMattersHeading: "Prepared Response",
      whyItMatters:
        "In a real-world business environment, I would use AWS Trusted Advisor to identify unused or underutilized resources such as EC2 instances, EBS volumes, and load balancers. This would help reduce unnecessary cloud spending and improve overall cost management. Trusted Advisor can also help businesses follow AWS best practices for optimization.\n\nAutomated vulnerability scanning is important because cloud environments change very quickly. Tools like Amazon Inspector can continuously scan systems for vulnerabilities and security risks without requiring manual checks every time. This helps organizations detect and fix problems faster before they become serious security issues.\n\nI do not think automation can fully replace manual security reviews. Automated tools are very useful for finding known vulnerabilities and monitoring systems continuously, but they cannot fully understand business logic or complex security decisions. The best approach is to combine automation with human analysis and review.",
    },
    {
      id: "lab4-secure-the-os",
      title: "Lab 4: Secure the OS",
      objective:
        "Create and configure a Linux environment using either Ubuntu or an Amazon Machine Image (AMI) on AWS. Perform essential system administration, monitoring, and security tasks to gain hands-on experience with Linux operations.",
      tasks: [
        "Verify system information by displaying the current Linux distribution",
        "Display the currently logged-in user",
        "Show server uptime",
        "List all users on the operating system",
        "Display the available disk space on the system",
        "Display the system's IP address",
        "Enable the firewall",
        "Edit the SSH configuration to allow only a specified user to log in",
        "Show open ports and services",
        "List open network connections",
        "Show the detailed firewall status",
        "Trace the network path for AWS",
        "Create a new user",
        "Disable that account, try to switch into that account, and show the denial page",
        "Block RDP",
        "Show the login records",
        "Scan or list open ports",
        "List all running processes",
        "Check for rootkits",
        "Identify all listening ports on the computer and determine the associated addresses or services",
        "Attempt to connect to each listening address by visiting it in a browser or using a ping command, where applicable",
        "Answer: Why do you think these services are allowed to listen for connections on your system?",
      ],
      submissionInstructions: [
        "Document the work by taking screenshots and adding everything into one document",
        "Submit through SMC Canvas",
        "Due: May 24, 2026 at 11:59 pm",
        "20 possible points — ungraded",
        "Submitted: May 19, 2026 at 10:22 pm",
        "Unlimited attempts allowed",
        "Available: May 18, 2026 at 12:00 am until May 29, 2026 at 11:59 pm",
      ],
      whyItMattersHeading: "Lab Context",
      whyItMatters:
        "The Linux command line (CLI) is a powerful interface that allows system administrators and users to manage files, troubleshoot issues quickly and efficiently, and configure systems. In this activity, essential command-line tasks are used to complete common administrative and system-related functions in a CLI environment.\n\nBecause there are many Linux distributions and versions, multiple commands may exist to accomplish the same objective. This lab expects research and selection of appropriate commands instead of relying on a predefined solution, which reflects real-world administrative scenarios and reinforces troubleshooting and adaptability.",
    },
    {
      id: "lab4b-pihole-vpn",
      title: "Lab 4b: PiHole VPN",
      objective:
        'Set up an "Always Free" PiHole DNS server with PiVPN/WireGuard on a cloud Ubuntu instance, then verify VPN access to the PiHole admin page.',
      tasks: [
        "Launch an Ubuntu Linux server instance using Oracle Cloud (recommended) or AWS free-tier EC2",
        "Use the default Ubuntu version available for the lab, such as Ubuntu 22.04 or 24.04",
        "Create the instance with default storage options",
        "Choose a region closest to you",
        "Generate and save your SSH keys",
        "Note the server's public IP address and take a screenshot",
        "Review ingress/egress or inbound/outbound security group rules",
        "Allow SSH access and inbound UDP port 51820 for WireGuard client connections",
        "Take a screenshot of the cloud security group or firewall settings",
        "Connect to the instance over SSH",
        "Install PiHole with: curl -sSL https://install.pi-hole.net | bash",
        "Install PiVPN with: curl -L https://install.pivpn.io | bash",
        "During the PiVPN install, answer yes to using PiVPN as DNS",
        "Run pihole -r to reconfigure PiHole to use the wg0 interface",
        "Reboot the server with: sudo reboot",
        "Create a new PiVPN user with: pivpn -a",
        "Generate and display the WireGuard QR code with: pivpn -qr",
        "Take a screenshot of the PiVPN QR code",
        "Install the WireGuard mobile or desktop app on the client device",
        "Scan the QR code to configure the WireGuard client",
        "Use the endpoint format: <Your PiHole Private IP address>/admin",
        "Take a screenshot of the client settings",
        "Connect the client device to the VPN",
        "Verify the installation by navigating to the internal server address with /admin",
        "If the admin page does not load, edit /etc/iptables/rules.v4 and add a rule allowing TCP ports 80 and 443",
      ],
      submissionInstructions: [
        "Submit lab evidence through SMC Canvas",
        "Due: May 24, 2026 at 11:59 pm",
        "20 possible points — ungraded",
        "Submitted: May 19, 2026 at 11:40 pm",
        "Unlimited attempts allowed",
        "Available: May 18, 2026 at 12:00 am until May 29, 2026 at 11:59 pm",
      ],
      whyItMattersHeading: "Lab Context",
      whyItMatters:
        "This lab demonstrates the cloud security configuration required when running application servers in the cloud. The PiHole and PiVPN stack requires access control at both the operating system level and the cloud provider level, including SSH access, WireGuard UDP port 51820, and any required web access ports.\n\nThe setup also reinforces configuration-file editing, security group management, VPN client configuration, and service validation. These projects build the foundational skills needed for the final project.",
      resourceSections: [
        {
          title: "Commands and Config Notes",
          items: [
            "Install PiHole: curl -sSL https://install.pi-hole.net | bash",
            "Install PiVPN: curl -L https://install.pivpn.io | bash",
            "Reconfigure PiHole interface: pihole -r",
            "Reboot server: sudo reboot",
            "Create PiVPN user: pivpn -a",
            "Show PiVPN QR code: pivpn -qr",
            "Edit firewall rules if needed: sudo nano /etc/iptables/rules.v4",
            "Allow web access rule: -A INPUT -p tcp -m state --state NEW -m multiport --dports 80,443 -j ACCEPT",
            "Place the 80/443 rule directly below the existing SSH port 22 allow rule",
          ],
        },
        {
          title: "Screenshot Checklist",
          items: [
            "Cloud instance public IP address",
            "Security group or firewall rules showing UDP port 51820",
            "PiVPN QR code",
            "WireGuard client settings",
            "PiHole admin page reached through the VPN",
          ],
        },
      ],
      previewFiles: [
        {
          fileUrl:
            "/code-playground/CS79D/mod-5/pihole-vpn-admin-login-verification.png",
          filename: "pihole-vpn-admin-login-verification.png",
          buttonLabel: "PiHole VPN Admin Verification",
        },
      ],
    },
    {
      id: "lab4c-inspector",
      title: "Lab 4c: Inspector",
      objective:
        "Launch a Linux EC2 instance, enable Amazon Inspector, verify resource coverage, and analyze detected security findings for automated vulnerability management.",
      tasks: [
        "Launch an EC2 instance using any Linux distribution from an AWS-managed AMI, Marketplace AMI, or Community AMI",
        "Use t2.micro or another instance type that appears as free on the account",
        "Configure 8 GiB storage",
        "Configure the security group to allow SSH on port 22 from your IP or from all sources as required by the lab",
        "Add the tag Key = Name, Value = InspectorEC2InstanceLinux",
        "Create or use an existing key pair for SSH access",
        "Take the first deliverable screenshot showing the EC2 instance summary, configuration, and tags",
        "Open the Amazon Inspector console",
        "Select Get Started or Enable Inspector",
        "Enable scanning for EC2 instances",
        "Name the target MyTargetLinux",
        "Use tag filters with Key = Name and Value = InspectorEC2InstanceLinux",
        "Leave the defaults, activate the account, and click Save",
        "Open Resource Coverage in the Inspector console",
        "Locate the EC2 instance and confirm its coverage or scan status",
        "Adjust scan settings to Hybrid or Agent-based if needed",
        "Navigate to Findings in the Amazon Inspector console",
        "Review detected vulnerabilities, severity levels, finding type, and remediation guidance",
        "Select a finding to view detailed information and remediation recommendations",
        "Take the third deliverable screenshot showing remediation details",
      ],
      submissionInstructions: [
        "Submit lab evidence through SMC Canvas",
        "Due: May 24, 2026 at 11:59 pm",
        "20 possible points — ungraded",
        "Submitted: May 20, 2026 at 12:08 am",
        "Unlimited attempts allowed",
        "Available: May 18, 2026 at 12:00 am until May 29, 2026 at 11:59 pm",
      ],
      whyItMattersHeading: "Lab Context",
      whyItMatters:
        "Amazon Inspector is an automated vulnerability management service for AWS workloads. This lab demonstrates how outdated or unpatched systems can introduce security risks and how Inspector helps identify and mitigate vulnerabilities.\n\nOver time, operating systems accumulate vulnerabilities due to outdated software packages, kernel issues, deprecated libraries, insecure services, and configuration weaknesses. If left unmanaged, these systems create a significant attack surface. Amazon Inspector continuously scans AWS resources and compares them against known vulnerabilities so organizations can detect and address risks before they are exploited.",
      resourceSections: [
        {
          title: "Deliverables",
          items: [
            "Screenshot of the EC2 instance summary showing configuration and tags",
            "Screenshot of Inspector account/resource coverage showing EC2 scanning status",
            "Screenshot showing a selected finding with remediation guidance",
          ],
        },
        {
          title: "Finding Review Checklist",
          items: [
            "Severity levels: Critical, High, Medium, Low",
            "Finding type, such as Network Reachability",
            "Affected EC2 resource and related metadata",
            "Open network path or vulnerable configuration",
            "Remediation recommendation",
          ],
        },
      ],
      previewFiles: [
        {
          fileUrl:
            "/code-playground/CS79D/mod-5/inspector-account-resource-coverage.png",
          filename: "inspector-account-resource-coverage.png",
          buttonLabel: "Inspector Coverage",
        },
        {
          fileUrl:
            "/code-playground/CS79D/mod-5/inspector-network-reachability-findings.png",
          filename: "inspector-network-reachability-findings.png",
          buttonLabel: "Inspector Findings",
        },
        {
          fileUrl:
            "/code-playground/CS79D/mod-5/inspector-port-22-remediation-detail.png",
          filename: "inspector-port-22-remediation-detail.png",
          buttonLabel: "Inspector Remediation",
        },
      ],
    },
    {
      id: "lab4d-trusted-advisor",
      title: "Lab 4d: Trusted Advisor",
      objective:
        "Explore AWS Trusted Advisor as a real-time guidance tool for recommendations across cost optimization, performance, security, fault tolerance, and service limits.",
      tasks: [
        "Log in to the AWS Management Console",
        "Navigate to AWS Trusted Advisor",
        "Confirm that Trusted Advisor loads and displays current checks",
        "Review the Security category for checks such as MFA on Root Account or S3 Bucket Permissions",
        "Review the Service Limits category and identify any services nearing quota limits",
        "Review any available Cost Optimization recommendations if the account support plan exposes them",
        "Review any available Performance checks",
        "Review any available Fault Tolerance checks",
        "Take 2-3 screenshots showing different check categories and their green, yellow, or red status",
        "Take at least one screenshot showing a specific recommendation and its details",
      ],
      submissionInstructions: [
        "Submit lab evidence through SMC Canvas",
        "Due: May 24, 2026 at 11:59 pm",
        "20 possible points — ungraded",
        "Submitted: May 20, 2026 at 12:37 am",
        "Unlimited attempts allowed",
        "Available: May 19, 2026 at 12:00 am until May 29, 2026 at 11:59 pm",
      ],
      whyItMattersHeading: "Lab Context",
      whyItMatters:
        "AWS Trusted Advisor inspects an AWS environment and provides recommendations based on AWS best practices. Depending on the support plan, it can help identify opportunities to reduce monthly costs, secure the AWS environment, improve service reliability, and avoid service limit breaches.\n\nFree-tier accounts provide access to limited checks, especially Security and Service Limits, so this lab focuses on reviewing the available guidance and documenting the visible recommendation status.",
      resourceSections: [
        {
          title: "Recommendation Categories",
          items: [
            "Cost Optimization — reduce monthly AWS costs where checks are available",
            "Performance — identify opportunities to improve application and resource performance",
            "Security — review checks such as MFA on Root Account and S3 Bucket Permissions",
            "Fault Tolerance — review checks related to reliability and resilience",
            "Service Limits — identify services nearing quota limits",
          ],
        },
        {
          title: "Helpful Resources",
          items: [
            "AWS Trusted Advisor Documentation: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html",
            "Trusted Advisor Best Practices: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html",
            "Trusted Advisor Access by Support Plan: https://aws.amazon.com/premiumsupport/plans/",
          ],
        },
        {
          title: "Screenshot Checklist",
          items: [
            "2-3 screenshots showing different Trusted Advisor check categories",
            "Screenshots should show category status colors such as green, yellow, or red",
            "At least one screenshot must show a specific recommendation and its details",
          ],
        },
      ],
    },
  ],
  quiz: {
    title: "Inspector & Trusted Advisor",
    dueLabel: "May 24, 2026 at 11:59 pm — 15 min limit — 10 pts",
    questions: [
      {
        id: 1,
        question:
          "How many AWS Trusted Advisor checks are available to all AWS customers?",
        options: ["25", "7", "12", "36"],
      },
      {
        id: 2,
        question:
          "Full Trusted Advisor Benefits is only available to which type of AWS accounts? (Choose 2)",
        options: ["Business", "Developer", "Enterprise", "Personal"],
        multiple: true,
      },
      {
        id: 3,
        question:
          "Which AWS service is an online resource to help you reduce cost, increase performance, and improve security by optimizing your AWS environment?",
        options: ["AWS Config", "Trusted Advisor", "Inspector", "CloudTrail"],
      },
      {
        id: 4,
        question:
          "Which AWS service provides automated security assessment to help improve the security and compliance of applications deployed on AWS?",
        options: ["Inspector", "AWS Config", "Trusted Advisor", "CloudWatch"],
      },
      {
        id: 5,
        question: "Amazon Inspector requires an agent to be installed.",
        options: ["True", "False"],
      },
      {
        id: 6,
        question:
          "Amazon Inspector checks your system against the CVE security database.",
        options: ["True", "False"],
      },
      {
        id: 7,
        question:
          "A potential security issue discovered during the Amazon Inspector assessment run of the specified target is called __________.",
        options: ["Exploits", "Zero Day", "Pwned", "Finding"],
      },
      {
        id: 8,
        question:
          "Inspector agents can be installed on which operating systems? (Select 3)",
        options: ["Windows 2008 R2", "Windows 2003", "Redhat", "Amazon Linux"],
        multiple: true,
      },
      {
        id: 9,
        question: "CVE can be searched at which website(s)?",
        options: [
          "https://nvd.nist.org",
          "https://cve.org",
          "https://cve.mitre.org/",
          "https://inspector.com",
        ],
        multiple: true,
      },
      {
        id: 10,
        question: "Inspector checks for common security best practices.",
        options: ["True", "False"],
      },
    ],
    answers: [
      {
        quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
        questionId: 1,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
        questionId: 2,
        correctAnswer: [0, 2],
      },
      {
        quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
        questionId: 3,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
        questionId: 4,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
        questionId: 5,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
        questionId: 6,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
        questionId: 7,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
        questionId: 8,
        correctAnswer: [0, 2, 3],
      },
      {
        quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
        questionId: 9,
        correctAnswer: [0, 1, 2],
      },
      {
        quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
        questionId: 10,
        correctAnswer: [0],
      },
    ],
  },
} satisfies CS79DModuleBlueprint;
