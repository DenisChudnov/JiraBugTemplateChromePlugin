function clickOnCreateButton() {
        let createButton = document.getElementById('createGlobalItemIconButton');
        createButton.click();

        const observer = new MutationObserver((mutations, obs) => {
            const issueTypeDropdownSelector = document.getElementById('issue-create.ui.modal.create-form.type-picker.issue-type-select');
            if (issueTypeDropdownSelector) {
                let description_field = document.getElementById('description-container');
                const description = description_field.querySelector('.ProseMirror');
                const paragraph = description.querySelectorAll('p');
                paragraph[0].parentNode.innerHTML="" +
                    "<p><strong>DESCRIPTION:</strong></p>" +
                    "<p><strong>STEPS TO REPRODUCE:</strong></p>\n" +
                    "    <ol className=\"ak-ol\" data-indent-level=\"1\">\n" +
                    "        <li><p>Open …</p></li>\n" +
                    "    </ol>" +
                    " <p><strong>ACTUAL RESULT:</strong></p>" +
                    "<p><strong>EXPECTED RESULT:</strong></p>";
                issueTypeDropdownSelector.click();
                obs.disconnect();
                return;
            }
        })

    observer.observe(document, {
        childList: true,
        subtree: true
    })

}

function fillBugDescriptionWithTemplate() {
        let description_field = document.getElementById('description-container');
        const description = description_field.querySelector('.ProseMirror');
        const paragraph = description.querySelectorAll('p');
        paragraph[0].parentNode.innerHTML="" +
            "<p><strong>DESCRIPTION:</strong></p>" +
            "<p><strong>STEPS TO REPRODUCE:</strong></p>\n" +
            "    <ol className=\"ak-ol\" data-indent-level=\"1\">\n" +
            "        <li><p>Open …</p></li>\n" +
            "    </ol>" +
            " <p><strong>ACTUAL RESULT:</strong></p>" +
            "<p><strong>EXPECTED RESULT:</strong></p>";
}

let open_create_window_btn = document.getElementById("show_and_fill");
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


