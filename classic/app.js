const urlBrowser = document.getElementById("urlBrowser");
const collapseButton = document.getElementById("collapseButton");

const data = {
  root: {
    portfolio: {
      furddle: ["https://furddle.com/"],
      mastercardfoundation: [
        "https://portal.agriconnectghana.com/",
        "https://portal.agriconnectghana.com/project-management/login",
        "https://portal.agriconnectghana.com/admin",
      ],
      driganostruct: ["https://www.driganostruct.com/"],
      precisionengravings: ["https://precisionengravings.store/"],
      falcon: [
        "https://falcon-admin.netlify.app/",
        "https://sairesources.netlify.app/landing-page",
      ],
      boxbites: ["coming soon..."],
    },
    microservices: {
      swift: {
        "api-gateway": ["https://api.saitechnology.co/swift/"],
        "ussd-application": ["https://api.saitechnology.co/ussd/"],
      },
      munchies: {
        "api-gateway": ["https://munchies-backend-1ecfbbcf9e11.herokuapp.com/"],
      },
      falcon: { "api-gateway": ["https://api.saitechnology.co/falcon/"] },
    },
  },
};

function renderUrlBrowser(data, currentPath = "") {
  const currentData = currentPath
    .split(".")
    .reduce((obj, key) => obj && obj[key], data);

  if (!currentData) {
    console.error("Invalid path:", currentPath);
    return;
  }

  const ul = document.createElement("ul");

  for (const [key, value] of Object.entries(currentData)) {
    const li = document.createElement("li");
    li.classList.add("folder");
    li.textContent = key;

    li.addEventListener("click", function (event) {
      event.stopPropagation();

      const isAlreadyOpen = li.classList.contains("open");
      if (isAlreadyOpen) {
        li.classList.remove("open");
        while (li.lastChild !== li.firstChild) {
          li.removeChild(li.lastChild);
        }
      } else {
        if (Array.isArray(value)) {
          const ulInner = document.createElement("ul");
          for (const url of value) {
            const urlLi = document.createElement("li");
            urlLi.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
            ulInner.appendChild(urlLi);
          }
          li.appendChild(ulInner);
        } else {
          const folderContents = renderUrlBrowser(
            data,
            currentPath + "." + key
          );
          li.appendChild(folderContents);
        }
        li.classList.add("open");
      }
    });

    ul.appendChild(li);
  }

  return ul;
}

function collapseAllFolders() {
  const folders = urlBrowser.querySelectorAll("li.folder.open");
  folders.forEach((folder) => {
    folder.classList.remove("open");
    while (folder.lastChild !== folder.firstChild) {
      folder.removeChild(folder.lastChild);
    }
  });
}

collapseButton.addEventListener("click", collapseAllFolders);

urlBrowser.appendChild(renderUrlBrowser(data, "root"));
