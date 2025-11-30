/**
 * Generates a random UUID v4.
 * @returns {string} A UUID string in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Gets the current timestamp in ISO 8601 format.
 * @returns {string} ISO 8601 formatted timestamp (e.g., "2024-01-15T10:30:00.000Z")
 */
function getCurrentTimestamp() {
    return new Date().toISOString();
}

/**
 * Creates markdown content with YAML front matter.
 * @param {string} userContent - The main content of the knowledge base node
 * @param {string} uuid - The unique identifier for the node
 * @param {string} timestamp - ISO 8601 timestamp of creation
 * @returns {string} Formatted markdown with front matter and content
 */
function createMarkdownContent(userContent, uuid, timestamp) {
    return `---
id: ${uuid}
created: ${timestamp}
---

${userContent}`;
}

/**
 * Creates a pre-filled GitHub URL for creating a new file.
 * Opens the GitHub interface with filename, content, and commit message pre-populated.
 * @param {string} filename - The path and filename for the new file (e.g., "kb/uuid.md")
 * @param {string} content - The file content
 * @param {string} commitMessage - The commit message
 * @returns {string} GitHub URL for creating a new file
 */
function createGitHubURL(filename, content, commitMessage) {
    const repoOwner = 'simple-kb';
    const repoName = 'simple-kb.github.io';
    const branch = 'main';

    const encodedContent = encodeURIComponent(content);
    const encodedMessage = encodeURIComponent(commitMessage);

    return `https://github.com/${repoOwner}/${repoName}/new/${branch}?filename=${filename}&value=${encodedContent}&message=${encodedMessage}`;
}

/**
 * Form submission handler for creating a new knowledge base node.
 * Generates UUID, creates markdown content, and opens GitHub PR creation page.
 */
document.getElementById('kb-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const content = document.getElementById('content').value.trim();

    if (!content) {
        alert('Please enter some content');
        return;
    }

    const uuid = generateUUID();
    const timestamp = getCurrentTimestamp();
    const filename = `kb/${uuid}.md`;
    const markdownContent = createMarkdownContent(content, uuid, timestamp);
    const commitMessage = `Create node ${uuid}`;

    const githubURL = createGitHubURL(filename, markdownContent, commitMessage);

    window.open(githubURL, '_blank');

    document.getElementById('content').value = '';
});
