const carouselIntervalMs = 5200;

function initNavMenu(button: HTMLButtonElement) {
  const menu = document.querySelector<HTMLElement>("[data-nav-menu]");

  if (!menu) {
    return;
  }

  function setOpen(isOpen: boolean) {
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menu.classList.toggle("is-open", isOpen);
  }

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Node) || button.contains(target) || menu.contains(target)) {
      return;
    }

    setOpen(false);
  });
}

function initDomainDemo(demo: HTMLElement) {
  let hasStarted = false;
  let isIntersecting = false;
  let observer: IntersectionObserver | undefined;

  function canStart() {
    return document.visibilityState === "visible" && isIntersecting;
  }

  function tryStart() {
    if (hasStarted || !canStart()) {
      return;
    }

    hasStarted = true;
    demo.classList.add("is-running");
    observer?.disconnect();
    document.removeEventListener("visibilitychange", tryStart);
    window.removeEventListener("focus", tryStart);
  }

  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries.some((entry) => entry.isIntersecting);
        tryStart();
      },
      { threshold: 0.28 },
    );
    observer.observe(demo);
  } else {
    isIntersecting = true;
  }

  document.addEventListener("visibilitychange", tryStart);
  window.addEventListener("focus", tryStart);
  tryStart();
}

function copyCommand(button: HTMLButtonElement) {
  const shell = button.closest<HTMLElement>("[data-command-shell]");
  const command = shell?.querySelector<HTMLElement>("[data-command-value]");
  const value = command?.dataset.copyValue ?? command?.textContent?.trim();

  if (!shell || !value) {
    return;
  }

  const readyLabel = shell.dataset.copyReady ?? button.textContent ?? "Copy";
  const doneLabel = shell.dataset.copyDone ?? readyLabel;

  if (!navigator.clipboard) {
    button.textContent = readyLabel;
    return;
  }

  void navigator.clipboard
    .writeText(value)
    .then(() => {
      button.textContent = doneLabel;
      window.setTimeout(() => {
        button.textContent = readyLabel;
      }, 1400);
    })
    .catch(() => {
      button.textContent = readyLabel;
    });
}

function initScenarioCarousel(carousel: HTMLElement) {
  const tabs = Array.from(carousel.querySelectorAll<HTMLButtonElement>("[data-scenario-tab]"));
  const panels = Array.from(carousel.querySelectorAll<HTMLElement>("[data-scenario-panel]"));
  let activeIndex = 0;
  let intervalId: number | undefined;

  function setActive(index: number) {
    activeIndex = (index + tabs.length) % tabs.length;

    tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === activeIndex;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    panels.forEach((panel, panelIndex) => {
      const isActive = panelIndex === activeIndex;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", isActive ? "false" : "true");
    });
  }

  function start() {
    window.clearInterval(intervalId);
    intervalId = window.setInterval(() => {
      setActive(activeIndex + 1);
    }, carouselIntervalMs);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      setActive(index);
      start();
    });
  });

  carousel.addEventListener("mouseenter", () => {
    window.clearInterval(intervalId);
  });

  carousel.addEventListener("mouseleave", start);

  setActive(0);
  start();
}

document.querySelectorAll<HTMLButtonElement>("[data-copy-command]").forEach((button) => {
  button.addEventListener("click", () => {
    copyCommand(button);
  });
});

document.querySelectorAll<HTMLButtonElement>("[data-nav-menu-toggle]").forEach(initNavMenu);

document.querySelectorAll<HTMLElement>("[data-domain-demo]").forEach(initDomainDemo);

document.querySelectorAll<HTMLElement>("[data-scenario-carousel]").forEach(initScenarioCarousel);
