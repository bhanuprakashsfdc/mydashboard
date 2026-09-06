import { useState } from "react";
import { prompts, promptCategories } from "../data/prompts";
import { getCategoryBadgeStyle } from "../utils/labels";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Sidebar from "../components/Sidebar/Sidebar";
import "./PromptsPage.css";

export default function PromptsPage() {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [formData, setFormData] = useState({});
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [copiedPromptId, setCopiedPromptId] = useState(null);

  const handleFieldChange = (fieldKey, value) => {
    setFormData((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const copyPrompt = async (prompt) => {
    const text = prompt.promptText || prompt.description;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPromptId(prompt.id);
      setTimeout(() => setCopiedPromptId(null), 1500);
    } catch {
      // ignore clipboard errors
    }
  };

  const generateEmail = () => {
    if (!selectedPrompt) return;

    const fields = selectedPrompt.fields;
    const subject = selectedPrompt.subject;
    let emailBody = `Subject: ${subject}\n\n`;

    fields.forEach((field) => {
      const value = formData[field.key] || "";
      emailBody += `${field.label}\n`;
      emailBody += `${value}\n\n`;
    });

    setGeneratedEmail(emailBody);
  };

  const resetForm = () => {
    setSelectedPrompt(null);
    setFormData({});
    setGeneratedEmail("");
  };

  return (
    <div className="prompts-page">
      <Sidebar selectedSection="prompts" onSelectSection={resetForm} accountCounts={{}} promptsCount={prompts.length} />
      <div className="prompts-page-main">
        <div className="prompts-page-header">
          <h1 className="prompts-page-title">Prompts</h1>
          <p className="prompts-page-subtitle">
            Work prompts and templates
          </p>
        </div>

        <div className="prompts-layout">
          <div className="prompts-list">
            <h2 className="prompts-section-title">Available Prompts</h2>
            <div className="prompts-cards">
              {prompts.map((prompt) => {
                const categoryStyle = getCategoryBadgeStyle(prompt.category);
                const categoryLabel = promptCategories.find((c) => c.id === prompt.category)?.label || prompt.category;

                return (
                  <div
                    key={prompt.id}
                    className={`prompt-card ${selectedPrompt?.id === prompt.id ? "prompt-card-selected" : ""}`}
                    onClick={() => {
                      setSelectedPrompt(prompt);
                      setGeneratedEmail("");
                    }}
                  >
                    <div className="prompt-card-header">
                      <h3 className="prompt-card-title">{prompt.title}</h3>
                      <Badge
                        variant={prompt.category === "work" ? "success" : "info"}
                      >
                        {categoryLabel}
                      </Badge>
                    </div>
                    <p className="prompt-card-description">{prompt.description}</p>
                    <div className="prompt-card-actions">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyPrompt(prompt);
                        }}
                      >
                        {copiedPromptId === prompt.id ? "Copied" : "Copy Prompt"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="prompts-editor">
            {selectedPrompt ? (
              <>
                <div className="prompts-editor-header">
                  <h2 className="prompts-editor-title">{selectedPrompt.title}</h2>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                </div>

                {selectedPrompt.promptText && (
                  <div className="prompts-prompt-text">
                    <h3 className="prompts-prompt-text-title">Prompt</h3>
                    <pre className="prompts-prompt-text-content">
                      {selectedPrompt.promptText}
                    </pre>
                  </div>
                )}

                <div className="prompts-form">
                  {selectedPrompt.fields.map((field) => (
                    <div key={field.key} className="form-group">
                      <label className="form-label" htmlFor={field.key}>
                        {field.label}
                      </label>
                      <textarea
                        id={field.key}
                        className="form-textarea"
                        value={formData[field.key] || ""}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        rows={3}
                      />
                    </div>
                  ))}

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={generateEmail}
                    >
                      Generate Email
                    </button>
                  </div>
                </div>

                {generatedEmail && (
                  <div className="prompts-result">
                    <h3 className="prompts-result-title">Generated Email</h3>
                    <pre className="prompts-result-content">
                      {generatedEmail}
                    </pre>
                  </div>
                )}
              </>
            ) : (
              <div className="prompts-empty">
                <p className="prompts-empty-text">
                  Select a prompt template to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
