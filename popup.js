let open_create_window_btn = document.getElementById("show");
let fill_bug_description_btn = document.getElementById("fill")

open_create_window_btn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: clickOnCreateButton,
    });
})

fill_bug_description_btn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: fillBugDescriptionWithTemplate,
    });
})

function clickOnCreateButton() {
        let createButton = document.getElementById('createGlobalItemIconButton');
        createButton.click();
}

function fillBugDescriptionWithTemplate() {
        let description_field = document.getElementById('description-container');
        const description = description_field.querySelector('.ProseMirror');
        const paragraph = description.querySelectorAll('p');
        paragraph[0].parentNode.innerHTML="" +
            "<p><strong>ISSUE:</strong></p>" +
            "<p><strong>STEPS TO REPRODUCE:</strong></p>\n" +
            "    <ul className=\"ak-ul\" data-indent-level=\"1\">\n" +
            "        <li><p>Open …</p></li>\n" +
            "    </ul>" +
            " <p><strong>ACTUAL RESULT:</strong></p>" +
            "<p><strong>EXPECTED RESULT:</strong></p>";
}





