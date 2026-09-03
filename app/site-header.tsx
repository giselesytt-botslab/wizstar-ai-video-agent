"use client";

import { useEffect, useRef, useState } from "react";

type MenuKey = "products" | "enterprise" | "resources";

const productGroups = [
  {
    title: "AI Video Agent",
    links: [
       ["Agent E-commerce", "https://wizstar.com/home", ""],
       ["Agent Creative", "https://wizstar.com/home", ""],
    ],
  },
  {
    title: "AI Drama",
    links: [
       ["Novel to Script", "https://wizstar.com/home", ""],
       ["Localize Script", "https://wizstar.com/home", ""],
    ],
  },
  {
    title: "AI Creative Tools",
    links: [
       ["AI Avatar (Turbo)", "https://wizstar.com/home", "Hot · Make any avatar or photo speak naturally with synced lips, voice, and expressions."],
       ["AI Video Generator", "https://wizstar.com/home", "Hot · Turn text or images into cinematic videos with Seedance 2.5."],
       ["Viral Video Recreation", "https://wizstar.com/home", ""],
       ["AI Product Video", "https://wizstar.com/home", ""],
       ["AI Image Generator", "https://wizstar.com/home", ""],
       ["AI Video Translation", "https://wizstar.com/home", ""],
       ["AI Avatar", "https://wizstar.com/home", ""],
    ],
  },
] as const;

const enterpriseGroups = [
   { title: "Key Functions", links: [["AI Video", "https://wizstar.com/home"], ["AI Livestream", "https://wizstar.com/home"], ["Interactive AI Avatar", "https://wizstar.com/home"]] },
   { title: "Team", links: [["Sales", "https://wizstar.com/home"], ["E-Commerce", "https://wizstar.com/home"]] },
   { title: "Industries", links: [["Marketing", "https://wizstar.com/home"], ["Real Estate", "https://wizstar.com/home"]] },
] as const;

const resourceLinks = [
   ["Blog", "https://wizstar.com/home", "Tips, insights, and industry stories from Wizstar."],
] as const;

function ArrowIcon() {
  return <span className="menu-item-arrow" aria-hidden="true">↗</span>;
}

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const toggleMenu = (menu: MenuKey) => setOpenMenu((current) => current === menu ? null : menu);

  return (
    <header className="site-header" ref={headerRef}>
       <a className="brand" href="https://wizstar.com/home" aria-label="Wizstar home">
        <img src="/assets/wizstar-logo.png" alt="Wizstar" />
      </a>

      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((current) => !current)}
      >
        <span /><span /><span />
      </button>

      <nav className={`main-nav${mobileOpen ? " mobile-open" : ""}`} aria-label="Main navigation">
        <div className="nav-menu-wrap">
          <button type="button" className="nav-trigger" aria-expanded={openMenu === "products"} aria-controls="products-menu" onClick={() => toggleMenu("products")}>
            Products <small className="nav-chevron" aria-hidden="true" />
          </button>
          <div className="nav-dropdown products-dropdown" id="products-menu" data-open={openMenu === "products"}>
            <div className="product-menu-grid">
              {productGroups.map((group) => (
                <section key={group.title}>
                  <h4>{group.title}</h4>
                  {group.links.map(([label, href, description]) => (
                    <a href={href} key={label}>
                      <span><strong>{label}</strong>{description ? <small>{description}</small> : null}</span><ArrowIcon />
                    </a>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>

        <div className="nav-menu-wrap">
          <div className="enterprise-trigger-row">
             <a className="enterprise-direct" href="https://wizstar.com/home">Enterprise</a>
            <button type="button" className="enterprise-menu-button" aria-label="Enterprise menu" aria-expanded={openMenu === "enterprise"} aria-controls="enterprise-menu" onClick={() => toggleMenu("enterprise")}>
              <small className="nav-chevron" aria-hidden="true" />
            </button>
          </div>
          <div className="nav-dropdown enterprise-dropdown" id="enterprise-menu" data-open={openMenu === "enterprise"}>
            <div className="enterprise-menu-grid">
              {enterpriseGroups.map((group) => (
                <section key={group.title}>
                  <h4>{group.title}</h4>
                  {group.links.map(([label, href]) => <a href={href} key={label}><strong>{label}</strong><ArrowIcon /></a>)}
                </section>
              ))}
            </div>
          </div>
        </div>

        <div className="nav-menu-wrap">
          <button type="button" className="nav-trigger" aria-expanded={openMenu === "resources"} aria-controls="resources-menu" onClick={() => toggleMenu("resources")}>
            Resources <small className="nav-chevron" aria-hidden="true" />
          </button>
          <div className="nav-dropdown resources-dropdown" id="resources-menu" data-open={openMenu === "resources"}>
            {resourceLinks.map(([label, href, description]) => (
              <a href={href} key={label}>
                <span><strong>{label}</strong><small>{description}</small></span><ArrowIcon />
              </a>
            ))}
          </div>
        </div>

         <a className="nav-direct-link" href="https://wizstar.com/home">Pricing</a>
         <a className="nav-direct-link" href="https://wizstar.com/home">API</a>
      </nav>

       <a className="sign-in" href="https://wizstar.com/home">Sign in</a>
    </header>
  );
}
