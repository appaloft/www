const carouselIntervalMs = 5200;

function initNavMenu(button: HTMLButtonElement) {
  const menu = document.querySelector<HTMLElement>("[data-nav-menu]");

  if (!menu) {
    return;
  }

  const menuElement = menu;

  function setOpen(isOpen: boolean) {
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuElement.classList.toggle("is-open", isOpen);
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

    if (!(target instanceof Node) || button.contains(target) || menuElement.contains(target)) {
      return;
    }

    setOpen(false);
  });
}

function copyCommand(button: HTMLButtonElement) {
  const shell = button.closest<HTMLElement>("[data-command-shell]");
  const command =
    shell?.querySelector<HTMLElement>("[data-install-panel].is-active [data-command-value]") ??
    shell?.querySelector<HTMLElement>("[data-command-value]");
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

function initInstallTabs(shell: HTMLElement) {
  const tabs = Array.from(shell.querySelectorAll<HTMLButtonElement>("[data-install-tab]"));
  const panels = Array.from(shell.querySelectorAll<HTMLElement>("[data-install-panel]"));

  function setActive(key: string) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.installTab === key;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.installPanel === key;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.installTab;

      if (key) {
        setActive(key);
      }
    });
  });

  const activeTab = tabs.find((tab) => tab.classList.contains("is-active")) ?? tabs[0];

  if (activeTab?.dataset.installTab) {
    setActive(activeTab.dataset.installTab);
  }
}

function initScenarioCarousel(carousel: HTMLElement) {
  const tabs = Array.from(carousel.querySelectorAll<HTMLButtonElement>("[data-scenario-tab]"));
  const panels = Array.from(carousel.querySelectorAll<HTMLElement>("[data-scenario-panel]"));

  if (!tabs.length || !panels.length) {
    return;
  }

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

  function stop() {
    window.clearInterval(intervalId);
  }

  function start() {
    stop();
    intervalId = window.setInterval(() => {
      setActive(activeIndex + 1);
    }, carouselIntervalMs);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      setActive(index);
      start();
    });

    tab.addEventListener("mouseenter", () => {
      setActive(index);
      stop();
    });
  });

  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("mouseenter", stop);

  setActive(0);
  start();
}

document.querySelectorAll<HTMLButtonElement>("[data-copy-command]").forEach((button) => {
  button.addEventListener("click", () => {
    copyCommand(button);
  });
});

document.querySelectorAll<HTMLButtonElement>("[data-nav-menu-toggle]").forEach(initNavMenu);

document.querySelectorAll<HTMLElement>("[data-command-shell]").forEach(initInstallTabs);

document.querySelectorAll<HTMLElement>("[data-scenario-carousel]").forEach(initScenarioCarousel);
