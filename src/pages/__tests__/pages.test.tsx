// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import { MemoryRouter } from "react-router-dom"
import { Home, About, DashboardLayout, DashboardIndex, Settings, AdminIndex, Users, Contact, Legacy } from "../index"

afterEach(cleanup)

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>)
}

describe("Home", () => {
  it("renders heading and welcome message", () => {
    renderWithRouter(<Home />)
    expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument()
    expect(screen.getByText("Welcome to the DSL demo!")).toBeInTheDocument()
  })

  it("renders all navigation links with correct hrefs", () => {
    renderWithRouter(<Home />)
    const links: { name: string; href: string }[] = [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Dashboard", href: "/dashboard" },
      { name: "Admin", href: "/admin" },
      { name: "Legacy", href: "/legacy" },
    ]
    for (const { name, href } of links) {
      const link = screen.getByRole("link", { name })
      expect(link).toHaveAttribute("href", href)
    }
  })
})

describe("About", () => {
  it("renders heading and description", () => {
    renderWithRouter(<About />)
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument()
    expect(screen.getByText(/This is a child page/)).toBeInTheDocument()
  })

  it("renders back link to home", () => {
    renderWithRouter(<About />)
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/")
  })
})

describe("DashboardLayout", () => {
  it("renders layout heading and nav links", () => {
    renderWithRouter(<DashboardLayout />)
    expect(screen.getByText("Dashboard Layout (layout with path)")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Dashboard Home" })).toHaveAttribute("href", "/dashboard")
    expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute("href", "/dashboard/settings")
  })
})

describe("DashboardIndex", () => {
  it("renders heading and back link", () => {
    renderWithRouter(<DashboardIndex />)
    expect(screen.getByText("Dashboard Home (index page inside layout)")).toBeInTheDocument()
    expect(screen.getByText("This is the index page of the dashboard layout.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/")
  })
})

describe("Settings", () => {
  it("renders heading and back link to dashboard", () => {
    renderWithRouter(<Settings />)
    expect(screen.getByText("Settings (child page inside layout)")).toBeInTheDocument()
    expect(screen.getByText("This is a child page of the dashboard layout.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Back to Dashboard" })).toHaveAttribute("href", "/dashboard")
  })
})

describe("AdminIndex", () => {
  it("renders heading and links", () => {
    renderWithRouter(<AdminIndex />)
    expect(screen.getByText("Admin (group with path)")).toBeInTheDocument()
    expect(screen.getByText("This is the index page of the admin group (path: \"admin\").")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Users" })).toHaveAttribute("href", "/admin/users")
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/")
  })
})

describe("Users", () => {
  it("renders heading and back link to admin", () => {
    renderWithRouter(<Users />)
    expect(screen.getByText("Users (child page inside group)")).toBeInTheDocument()
    expect(screen.getByText("This is a child page within the admin group.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Back to Admin" })).toHaveAttribute("href", "/admin")
  })
})

describe("Contact", () => {
  it("renders heading and back link", () => {
    renderWithRouter(<Contact />)
    expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument()
    expect(screen.getByText("This is a child page at root level.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/")
  })
})

describe("Legacy", () => {
  it("renders heading and back link", () => {
    renderWithRouter(<Legacy />)
    expect(screen.getByText("Legacy (group without path)")).toBeInTheDocument()
    expect(screen.getByText("This page is inside a group without a path property.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/")
  })
})
