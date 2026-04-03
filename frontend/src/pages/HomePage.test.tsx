import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import * as HomePageModule from "./HomePage";

const HomePage = HomePageModule.default;

describe("<HomePage />", () => {
  it("shows new course accordions for CS 85, CS 79D, and CS 79C", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("button", { name: /CS 85 - PHP Programming/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /CS 79D - Security in Amazon Web Services/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /CS 79C - Compute Engines in Amazon Web Services/i,
      })
    ).toBeInTheDocument();
  });

  it("expands and switches accordion content on selection", async () => {
    const user = userEvent.setup();

    render(<HomePage />);

    await user.click(
      screen.getByRole("button", { name: /CS 85 - PHP Programming/i })
    );
    expect(
      screen.getByText(/PHP Syntax, Control Flow & Reusable Functions/i)
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /CS 79D - Security in Amazon Web Services/i,
      })
    );
    expect(
      screen.getByText(/AWS Shared Responsibility Model in Real Deployments/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/PHP Syntax, Control Flow & Reusable Functions/i)
    ).not.toBeInTheDocument();
  });

  it("shows the expanded CS 79C AWS stack from the 10 modules", async () => {
    const user = userEvent.setup();

    render(<HomePage />);

    await user.click(
      screen.getByRole("button", {
        name: /CS 79C - Compute Engines in Amazon Web Services/i,
      })
    );

    expect(
      screen.getByText(/AWS Storage Volumes with S3, EBS and EFS/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Containers, Kubernetes and Amazon EKS/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Messaging and API Workflows with SNS, SQS and API Gateway/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Serverless Functions with AWS Lambda and DynamoDB/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Infrastructure as Code with AWS CloudFormation/i)
    ).toBeInTheDocument();
  });

  it("refreshes the home page after a strong downward pull", () => {
    const reloadSpy = vi.fn();

    render(<HomePageModule.HomePageContent onRefresh={reloadSpy} />);

    const page = screen.getByRole("main");

    fireEvent.touchStart(page, {
      touches: [{ clientX: 20, clientY: 20 }],
    });
    fireEvent.touchMove(page, {
      touches: [{ clientX: 24, clientY: 280 }],
    });

    expect(screen.getByText(/Release to refresh/i)).toBeInTheDocument();

    fireEvent.touchEnd(page);

    expect(reloadSpy).toHaveBeenCalledTimes(1);
  });

  it("does not refresh after a short pull", () => {
    const reloadSpy = vi.fn();

    render(<HomePageModule.HomePageContent onRefresh={reloadSpy} />);

    const page = screen.getByRole("main");

    fireEvent.touchStart(page, {
      touches: [{ clientX: 30, clientY: 30 }],
    });
    fireEvent.touchMove(page, {
      touches: [{ clientX: 32, clientY: 120 }],
    });

    expect(screen.getByText(/Pull down to refresh/i)).toBeInTheDocument();

    fireEvent.touchEnd(page);

    expect(reloadSpy).not.toHaveBeenCalled();
    expect(screen.getByText(/Pull down to refresh/i)).toHaveClass("opacity-0");
  });
});
