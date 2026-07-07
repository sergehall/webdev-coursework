import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule05TextTasks = [
  {
    id: "classroom-engagement-slack-post",
    title: "Classroom Engagement - Slack Post",
    objective:
      "Discussion with your classmates is a vital part of learning and provides a richer class experience. You are encouraged to work together and help each other on lab assignments. In this course, you will participate in one class discussion in each module due by Saturday night. These discussions are a required part of the course.",
    tasks: [
      "Choose a discussion topic related to class assignment issues, comments, tips, recommendations, or questions.",
      "You may also post comments on the module topic, including any reading, lecture, or additional resources.",
      "You may share an AWS, cloud, or technology news article.",
      "You may share an AWS-related blog example such as https://aws.amazon.com/blogs/aws/.",
      "Post a screenshot of your Slack discussion entry to Canvas.",
    ],
    submissionInstructions: [
      "Your entry should be at least 2 to 5 sentences in length.",
      "Your entry can be a new entry or a reply to another student.",
      "Use professional grammar and punctuation in this college-level course in all correspondence.",
      'Avoid "text" or "Twitter speak" when corresponding.',
      "Post early and often during the week the discussion board is open.",
    ],
    whyItMattersHeading: "Tip",
    whyItMatters:
      "Read other students' entries because they often contain valuable suggestions for labs, projects, quizzes, and general course success.",
    resourceSections: [
      {
        title: "Discussion Guidelines",
        items: [
          "Your entry should be at least 2 to 5 sentences in length.",
          "Your entry can be a new entry or a reply to another student.",
          "Use professional grammar and punctuation in all correspondence.",
          'Avoid "text" or "Twitter speak" when corresponding.',
          "The Slack workspace should represent an ongoing discussion related to the subject matter under consideration.",
          "Students should post early and often during the week the discussion board is open.",
        ],
      },
    ],
  },
  {
    id: "kubernetes-optional-extra-credit-lab",
    title:
      "Lab 1: Kubernetes (Optional: Extra Credit) Kubernetes Interactive Tutorial with Minikube",
    objective:
      "In this lab, you will complete the Interactive Kubernetes Tutorial using Minikube on your local computer. This hands-on exercise provides practical experience with Kubernetes deployment, management, and troubleshooting in a safe local environment before working with cloud-based clusters.",
    tasks: [
      "Install a container runtime such as Docker Desktop or Podman.",
      "Install kubectl and Minikube for your operating system.",
      "Start a local Minikube cluster and verify it is running.",
      "Complete both required tutorials: Hello Minikube and Kubernetes Basics.",
      "Optionally deploy the Guestbook multi-tier application for extra practice.",
      "Capture screenshots that demonstrate each major setup, deployment, scaling, and troubleshooting milestone.",
    ],
    submissionInstructions: [
      "Create a Microsoft Word document with labeled screenshots demonstrating each major step.",
      "Include brief explanations for each screenshot.",
      "Show the full terminal window with the command and complete output whenever possible.",
      "Keep screenshots in chronological order matching the tutorial steps.",
      "Make sure the final document is clear, readable, organized, and professional.",
    ],
    whyItMattersHeading: "What is Minikube?",
    whyItMatters:
      "Minikube runs a single-node Kubernetes cluster on your local machine. It is ideal for learning Kubernetes, testing applications locally, and building confidence before working with managed Amazon EKS clusters in the cloud.",
    resourceSections: [
      {
        title: "Learning Outcomes",
        items: [
          "Install and configure a local Kubernetes development environment.",
          "Deploy containerized applications using kubectl.",
          "Understand Kubernetes core concepts such as Pods, Services, and Deployments.",
          "Manage and scale applications in Kubernetes.",
          "Troubleshoot common Kubernetes issues.",
          "Build confidence before working with production EKS clusters.",
        ],
      },
      {
        title: "Prerequisites",
        items: [
          "Computer requirements: minimum 2 CPU cores, 4 GB RAM, and 20 GB free disk space.",
          "Operating system: Windows 10 or 11, macOS 10.15 or later, or Linux.",
          "Administrator access to install software.",
          "Internet connection for downloading tools and container images.",
          "Estimated time commitment: approximately 2 to 3 hours.",
        ],
      },
      {
        title: "Step 1: Install Container Runtime",
        items: [
          "Docker Desktop is recommended for beginners and is free for personal and educational use.",
          "Windows verification commands: docker --version and docker run hello-world.",
          "macOS verification commands: docker --version and docker run hello-world.",
          "Podman is an open-source alternative available for Windows, Mac, and Linux.",
        ],
      },
      {
        title: "Step 2: Install kubectl",
        items: [
          "Windows with Chocolatey: choco install kubernetes-cli then kubectl version --client.",
          "macOS with Homebrew: brew install kubectl then kubectl version --client.",
          "Linux: download the latest kubectl binary, make it executable, move it into /usr/local/bin, then run kubectl version --client.",
          "kubectl is the command-line tool used to manage deployments, services, pods, and other Kubernetes resources.",
        ],
      },
      {
        title: "Step 3: Install Minikube",
        items: [
          "Windows with Chocolatey: choco install minikube then minikube version.",
          "macOS with Homebrew: brew install minikube then minikube version.",
          "Linux: install the Minikube binary into /usr/local/bin and verify with minikube version.",
          "Minikube creates a local Kubernetes cluster for learning and development.",
        ],
      },
      {
        title: "Step 4: Start Minikube Cluster",
        items: [
          "Start the cluster with minikube start --driver=docker.",
          "Optional resource-specific start: minikube start --driver=docker --cpus=2 --memory=4096.",
          "Verify with minikube status, kubectl cluster-info, kubectl get nodes, and kubectl get pods -A.",
          "Optional dashboard command: minikube dashboard.",
          "Common startup issues include Docker not running, port conflicts, insufficient system resources, or VPN-related image download failures.",
        ],
      },
      {
        title: "Step 5: Complete Interactive Tutorials",
        items: [
          "Tutorial 1 required: Hello Minikube.",
          "Key commands include kubectl create deployment hello-node --image=registry.k8s.io/echoserver:1.4, kubectl get deployments, kubectl get pods, kubectl expose deployment hello-node --type=LoadBalancer --port=8080, kubectl get services, and minikube service hello-node.",
          "Tutorial 2 required: Kubernetes Basics Interactive Tutorial.",
          "Complete all six modules: Create a Cluster, Deploy an App, Explore Your App, Expose Your App Publicly, Scale Your App, and Update Your App.",
          "Important tutorial commands include kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1, kubectl describe pods, kubectl logs, kubectl exec -ti <pod-name> -- bash, kubectl scale deployments/kubernetes-bootcamp --replicas=4, kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2, and kubectl rollout undo deployments/kubernetes-bootcamp.",
        ],
      },
      {
        title: "Step 6: Additional Practice",
        items: [
          "Deploy the Guestbook application with Redis for extra practice.",
          "Create Redis master and slave resources using kubectl apply -f with the Kubernetes example manifests.",
          "Create the Guestbook frontend and view all resources with kubectl get all.",
          "Access the app with minikube service frontend.",
          "Clean up with kubectl delete -f https://k8s.io/examples/application/guestbook/ when finished.",
        ],
      },
      {
        title: "Step 7: Useful kubectl Commands Reference",
        items: [
          "Cluster information: kubectl cluster-info, kubectl get nodes, kubectl get componentstatuses.",
          "Pods: kubectl get pods, kubectl get pods -o wide, kubectl describe pod <name>, kubectl logs <name>, kubectl logs -f <name>, kubectl exec -it <name> -- /bin/bash.",
          "Deployments: kubectl get deployments, kubectl describe deployment <name>, kubectl scale deployment <name> --replicas=5, kubectl rollout status deployment/<name>, kubectl rollout history deployment/<name>, kubectl rollout undo deployment/<name>.",
          "Services and namespaces: kubectl get services, kubectl describe service <name>, kubectl get endpoints, kubectl get namespaces, kubectl get pods --all-namespaces, kubectl get pods -n <namespace>.",
          "Creation and deletion: kubectl create deployment <name> --image=<image>, kubectl expose deployment <name> --port=<port> --type=<type>, kubectl apply -f <file>, kubectl delete pod <name>, kubectl delete deployment <name>, kubectl delete service <name>, kubectl delete -f <file>.",
        ],
      },
      {
        title: "Clean Up Resources",
        items: [
          "Delete all deployments with kubectl delete deployment --all.",
          "Delete all services with kubectl delete service --all.",
          "Stop the cluster with minikube stop.",
          "Delete the cluster with minikube delete if you want a fresh start later.",
          "Restart later with minikube start.",
        ],
      },
      {
        title: "Screenshot Requirements for Submission",
        items: [
          "Installation verification: Docker version, kubectl version, and Minikube version.",
          "Cluster startup: Minikube start output, Minikube status, and kubectl get nodes.",
          "Hello Minikube tutorial: deployment creation, deployments list, pods list, service exposure, and browser view of the app.",
          "Kubernetes Basics tutorial: app deployment, pod details, logs, service creation, scaling, scaled pods, image update, and rollout status.",
          "Optional practice: Guestbook deployment, kubectl get all, and browser view of the Guestbook app.",
        ],
      },
      {
        title: "Screenshot Best Practices",
        items: [
          "Include timestamps in terminal screenshots.",
          "Make command prompts and outputs clearly visible.",
          "Add descriptive captions in the Word document.",
          "Show the full browser URL in browser screenshots.",
          "Organize screenshots in chronological order and use highlighting or annotations when helpful.",
        ],
      },
      {
        title: "Troubleshooting Common Issues",
        items: [
          "If Minikube will not start, make sure Docker Desktop is running, then try minikube delete followed by minikube start.",
          "If kubectl commands are not working, verify the context with kubectl config current-context and switch with kubectl config use-context minikube.",
          "If you cannot access the service in a browser, use minikube service <service-name> instead of a direct URL.",
          "If images will not download, check your internet connection, disable VPN temporarily, or configure a proxy if needed.",
          'If Pods are stuck in "Pending" state, run kubectl describe pod <name> and inspect resource, image, or node issues.',
        ],
      },
      {
        title: "Additional Learning Resources",
        items: [
          "Official Kubernetes Documentation.",
          "Minikube Official Documentation.",
          "kubectl Cheat Sheet.",
          "Additional Kubernetes Tutorials.",
          "Katacoda Interactive Scenarios (browser-based).",
        ],
      },
      {
        title: "Submission Checklist",
        items: [
          "Cover page with your name, date, and assignment title.",
          "All required installation verification screenshots.",
          "Cluster startup screenshots.",
          "Complete Hello Minikube tutorial screenshots.",
          "Complete Kubernetes Basics tutorial screenshots.",
          "Clear labels and captions for each screenshot.",
          "Brief explanations of what each screenshot demonstrates.",
          "Timestamps visible in terminal screenshots.",
          "Screenshots that are clear, readable, and professionally organized.",
        ],
      },
    ],
  },
  {
    id: "amazon-eks-cluster-deployment",
    title: "Lab 2: Amazon EKS Cluster Deployment",
    objective:
      "In this lab, you will create an Amazon EKS cluster step by step using the AWS Management Console. You will manually create IAM roles, configure networking, deploy a managed node group with t3.micro instances, and deploy a sample containerized application so you can understand how EKS integrates with IAM, VPC, and EC2.",
    tasks: [
      "Create or reuse the required IAM roles for the EKS control plane and worker nodes.",
      "Create the EKS cluster with Custom configuration and turn EKS Auto Mode off.",
      "Configure kubectl to communicate with the cluster.",
      "Create a managed node group with Amazon Linux 2023 and t3.micro instances.",
      "Deploy and expose a sample NGINX application.",
      "Optionally deploy the Guestbook application for additional Kubernetes practice.",
      "Clean up the cluster, node group, services, and any related AWS resources immediately after the lab.",
    ],
    submissionInstructions: [
      "Create a Word document with labeled screenshots for each required milestone.",
      'Include the EKS cluster showing "Active" status.',
      'Include the node group showing "Active" status.',
      'Include terminal output from kubectl get nodes showing all nodes in "Ready" status.',
      "Include the NGINX deployment and service output, including the external load balancer address.",
      'Include a browser screenshot showing the "Welcome to nginx!" page.',
      "Include cleanup verification showing that the cluster has been deleted.",
    ],
    whyItMattersHeading: "Important: EKS Auto Mode",
    whyItMatters:
      "As of late 2024, the AWS Console defaults to EKS Auto Mode with a Quick Configuration wizard. In this lab you must choose Custom configuration and turn Auto Mode off so you can see the underlying IAM, networking, and node group components. Auto Mode is also not compatible with AWS Academy Learner Labs.",
    resourceSections: [
      {
        title: "Prerequisites",
        items: [
          "AWS account in AWS Academy Learner Lab or a personal AWS account.",
          "Basic understanding of Kubernetes concepts such as pods, deployments, and services.",
          "Familiarity with the AWS Management Console.",
          "AWS CLI v2 installed and configured locally, or use AWS CloudShell.",
          "kubectl installed on your local machine.",
        ],
      },
      {
        title: "What You Will Learn",
        items: [
          "Create IAM roles for the EKS control plane and worker nodes.",
          "Create and configure an Amazon EKS cluster with Auto Mode disabled.",
          "Set up a managed node group for worker nodes.",
          "Configure kubectl to communicate with your cluster.",
          "Deploy and expose a containerized application.",
          "Understand how EKS integrates with IAM, VPC, EC2, and Elastic Load Balancing.",
        ],
      },
      {
        title: "Career Connection",
        items: [
          "Kubernetes and EKS skills are among the most in-demand cloud competencies.",
          "Cloud Engineers and DevOps Engineers with EKS experience often command salaries in the $100K to $160K range.",
          "Employers expect you to understand IAM roles, VPC networking, node groups, and kubectl, not just one automated command.",
        ],
      },
      {
        title: "Step 1: Install kubectl and Configure AWS CLI",
        items: [
          "Windows: install kubectl with Chocolatey using choco install kubernetes-cli, or download it directly from the Kubernetes install guide, then verify with kubectl version --client.",
          "macOS: install with Homebrew using brew install kubectl, then verify with kubectl version --client.",
          "Linux or AWS CloudShell: download the latest release, install it into /usr/local/bin, then verify with kubectl version --client.",
          "For personal accounts, run aws configure and set region to us-east-1 with json output.",
          'For AWS Academy Learner Lab, copy the AWS CLI credentials from "AWS Details" into ~/.aws/credentials and confirm the region is us-east-1.',
          "Verify your identity with aws sts get-caller-identity.",
        ],
      },
      {
        title: "Step 2: Create IAM Roles for EKS",
        items: [
          "AWS Academy students should use the pre-created LabRole for both the cluster role and the node group role.",
          "Personal accounts: create the cluster role with the EKS Cluster use case and AmazonEKSClusterPolicy attached. Name it myAmazonEKSClusterRole.",
          "Personal accounts: create the node group role with the EC2 use case and attach AmazonEKSWorkerNodePolicy, AmazonEC2ContainerRegistryReadOnly, and AmazonEKS_CNI_Policy. Name it myAmazonEKSNodeRole.",
        ],
      },
      {
        title: "Step 3: Create the EKS Cluster",
        items: [
          "Open the Amazon EKS Console in us-east-1 and click Add cluster, then Create.",
          "Select Custom configuration and toggle Use EKS Auto Mode to OFF.",
          "Name the cluster my-eks-cluster.",
          "AWS Academy: use LabRole, the default VPC, and public subnets in at least two Availability Zones.",
          "Personal account: use the default VPC or optionally create a dedicated CloudFormation VPC.",
          "Keep the default add-ons selected: Amazon VPC CNI, CoreDNS, and kube-proxy.",
          'Wait 10 to 15 minutes until the cluster status becomes "Active" before continuing.',
        ],
      },
      {
        title: "Optional Personal Account VPC Command",
        items: [
          "aws cloudformation create-stack --region us-east-1 --stack-name my-eks-vpc-stack --template-url https://s3.us-west-2.amazonaws.com/amazon-eks/cloudformation/2020-10-29/amazon-eks-vpc-private-subnets.yaml",
          "Wait for the CloudFormation stack to complete before using its VPC and subnets for the cluster.",
        ],
      },
      {
        title: "Step 4: Configure kubectl",
        items: [
          "Update kubeconfig with aws eks update-kubeconfig --region us-east-1 --name my-eks-cluster.",
          "Test the connection with kubectl get svc.",
          'If you see "You must be logged in," verify credentials with aws sts get-caller-identity, confirm the cluster is Active, and make sure the region is us-east-1.',
        ],
      },
      {
        title: "Step 5: Create a Managed Node Group",
        items: [
          "Open the cluster, go to the Compute tab, and click Add node group.",
          "Use the name my-node-group.",
          "AWS Academy: select LabRole. Personal account: select myAmazonEKSNodeRole.",
          "Use Amazon Linux 2023 (AL2023_x86_64_STANDARD), capacity type On-Demand, instance type t3.micro, and disk size 20 GB.",
          "Set desired size to 2, minimum size to 1, and maximum size to 4.",
          "Use the same subnets chosen for the cluster and leave SSH access disabled.",
          'Wait until the node group becomes "Active", then verify with kubectl get nodes and kubectl get nodes -o wide.',
        ],
      },
      {
        title: "Step 6: Deploy a Sample Application",
        items: [
          "Create the deployment with kubectl create deployment nginx --image=nginx:latest.",
          "Check deployments and pods with kubectl get deployments and kubectl get pods.",
          "Scale to three replicas with kubectl scale deployment nginx --replicas=3.",
          "Expose the app with kubectl expose deployment nginx --port=80 --type=LoadBalancer.",
          "Watch for the external address with kubectl get service nginx --watch, then test the page in a browser.",
          'You should see the "Welcome to nginx!" page.',
        ],
      },
      {
        title: "Step 6C and 6D: Explore the Cluster",
        items: [
          "Use kubectl describe pod <pod-name>, kubectl logs <pod-name>, kubectl get all, kubectl rollout status deployment/nginx, kubectl get pods --show-labels, and kubectl get svc --all-namespaces.",
          "In the AWS Console, inspect the cluster Compute and Resources tabs.",
          "Open the EC2 Console and review the load balancer created by the Kubernetes service.",
        ],
      },
      {
        title: "Step 7: Optional Guestbook Challenge",
        items: [
          "Deploy the Redis leader, Redis follower, and Guestbook frontend components using the official Kubernetes example manifests.",
          "Verify pod health with kubectl get pods.",
          "Get the frontend service address with kubectl get service frontend and test it in the browser.",
        ],
      },
      {
        title: "Learning Outcomes Achieved",
        items: [
          "Understand why EKS needs separate IAM roles for the control plane and worker nodes.",
          "See how Kubernetes manages containerized applications at scale.",
          "Experience how EKS integrates with VPC, IAM, EC2, and Elastic Load Balancing.",
          "Understand the benefits of AWS-managed worker nodes.",
          "Know the difference between manual configuration and EKS Auto Mode.",
          "Deploy, scale, and expose containerized applications with kubectl.",
        ],
      },
      {
        title: "Cleanup Instructions",
        items: [
          "Delete the NGINX service with kubectl delete service nginx.",
          "Delete the NGINX deployment with kubectl delete deployment nginx.",
          "If you deployed Guestbook, delete its services and deployments too.",
          "Delete the node group from the EKS Console and wait until deletion finishes.",
          "Delete the EKS cluster from the EKS Console.",
          "Delete lingering load balancers from the EC2 Console if needed.",
          "Personal accounts only: delete the CloudFormation VPC stack and optional IAM roles.",
          "Verify cleanup with aws eks list-clusters --region us-east-1, aws elb describe-load-balancers --region us-east-1, and aws elbv2 describe-load-balancers --region us-east-1.",
        ],
      },
      {
        title: "Required Screenshots for Submission",
        items: [
          'EKS cluster details page showing "Active" status.',
          'Node group details showing "Active" status.',
          'Terminal output from kubectl get nodes showing all nodes in "Ready" status.',
          "NGINX deployment and pods running with kubectl get all.",
          "Service output from kubectl get svc showing the external load balancer address.",
          'Browser screenshot showing the "Welcome to nginx!" page.',
          "Cleanup verification showing an empty cluster list after deletion.",
        ],
      },
      {
        title: "Screenshot Tips",
        items: [
          "Make sure timestamps are visible in terminal screenshots.",
          "Include the full load balancer URL in the service screenshot.",
          "Ensure AWS Console screenshots show your account information in the top-right corner.",
          "Label each screenshot clearly in the Word document.",
        ],
      },
      {
        title: "Troubleshooting Common Issues",
        items: [
          "If you accidentally used Quick Configuration with Auto Mode enabled, delete the cluster and recreate it with Custom configuration and Auto Mode off.",
          "If nodes are not joining the cluster, verify the node IAM role policies or confirm LabRole was selected in AWS Academy.",
          'If the load balancer stays in "pending", wait a few minutes and verify that public subnets and Ready nodes are in place.',
          "If kubectl commands return errors, rerun aws eks update-kubeconfig --region us-east-1 --name my-eks-cluster and verify your AWS credentials.",
          'If the AWS Academy session expired, restart the Learner Lab, refresh credentials from "AWS Details", and rerun update-kubeconfig.',
          "To minimize costs, complete the lab and cleanup in a single session.",
        ],
      },
      {
        title: "Additional Resources",
        items: [
          "AWS EKS Getting Started — Console and CLI (Official Guide).",
          "EKS Auto Mode Documentation.",
          "Create an Amazon EKS Cluster (All Options).",
          "Kubernetes Official Tutorial.",
          "kubectl Cheat Sheet.",
          "EKS Optimized AMI Documentation (Amazon Linux 2023).",
        ],
      },
    ],
  },
] satisfies NonNullable<CS79CModuleBlueprint["textTasks"]>;
