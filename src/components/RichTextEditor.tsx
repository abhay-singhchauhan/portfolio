
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Type,
} from "lucide-react";

interface RichTextEditorProps {
  initialValue: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue, onChange }) => {
  const [editorContent, setEditorContent] = useState(initialValue);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
    onChange(e.target.value);
  };

  const insertText = (before: string, after: string = "") => {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editorContent.substring(start, end);
    const newContent = 
      editorContent.substring(0, start) + 
      before + 
      selectedText + 
      after + 
      editorContent.substring(end);
    
    setEditorContent(newContent);
    onChange(newContent);
    
    // Reset selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const insertHeading = (level: number) => {
    const prefix = '#'.repeat(level) + ' ';
    insertText(prefix);
  };

  const insertFormattedText = (type: 'bold' | 'italic' | 'code' | 'underline') => {
    const markers = {
      bold: ["**", "**"],
      italic: ["*", "*"],
      code: ["`", "`"],
      underline: ["<u>", "</u>"]
    };
    
    insertText(markers[type][0], markers[type][1]);
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      insertText(`[${linkText}](${linkUrl})`);
      setLinkUrl('');
      setLinkText('');
      setShowLinkForm(false);
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      const alt = imageAlt || 'Image';
      insertText(`![${alt}](${imageUrl})`);
      setImageUrl('');
      setImageAlt('');
      setShowImageForm(false);
    }
  };

  const insertList = (ordered: boolean) => {
    const prefix = ordered ? "1. " : "- ";
    insertText(prefix);
  };

  const insertBlockquote = () => {
    insertText("> ");
  };

  const formatHTML = (content: string) => {
    // Basic Markdown to HTML conversion
    let html = content
      // Convert headers
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      // Images
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto my-4 rounded-lg" />')
      // Lists
      .replace(/^- (.*)$/gm, '<li>$1</li>')
      // Blockquotes
      .replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 py-2 my-4">$1</blockquote>')
      // Code
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">$1</code>')
      // Line breaks
      .replace(/\n/g, '<br />');
    
    return html;
  };

  return (
    <div className="border rounded-md">
      <div className="bg-white dark:bg-gray-800 p-2 border-b flex flex-wrap gap-1">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertHeading(1)}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertHeading(2)}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertFormattedText('bold')}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertFormattedText('italic')}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertFormattedText('underline')}
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertList(false)}
          title="Bulleted List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertList(true)}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={insertBlockquote}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowLinkForm(!showLinkForm)}
          title="Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowImageForm(!showImageForm)}
          title="Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertFormattedText('code')}
          title="Code"
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>

      {showLinkForm && (
        <div className="p-3 bg-gray-50 dark:bg-gray-900 border-b flex flex-wrap gap-2 items-center">
          <Input 
            type="text" 
            placeholder="Link text" 
            value={linkText} 
            onChange={(e) => setLinkText(e.target.value)} 
            className="w-40 text-sm"
          />
          <Input 
            type="url" 
            placeholder="URL" 
            value={linkUrl} 
            onChange={(e) => setLinkUrl(e.target.value)} 
            className="w-40 text-sm"
          />
          <Button size="sm" onClick={insertLink}>Insert Link</Button>
          <Button size="sm" variant="ghost" onClick={() => setShowLinkForm(false)}>Cancel</Button>
        </div>
      )}

      {showImageForm && (
        <div className="p-3 bg-gray-50 dark:bg-gray-900 border-b flex flex-wrap gap-2 items-center">
          <Input 
            type="url" 
            placeholder="Image URL" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            className="w-40 text-sm"
          />
          <Input 
            type="text" 
            placeholder="Alt text" 
            value={imageAlt} 
            onChange={(e) => setImageAlt(e.target.value)} 
            className="w-40 text-sm"
          />
          <Button size="sm" onClick={insertImage}>Insert Image</Button>
          <Button size="sm" variant="ghost" onClick={() => setShowImageForm(false)}>Cancel</Button>
        </div>
      )}

      <Tabs defaultValue="write" value={activeTab} onValueChange={(value) => setActiveTab(value as 'write' | 'preview')}>
        <TabsList className="w-full justify-start bg-transparent border-b rounded-none">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="p-0 border-0">
          <Textarea 
            id="editor"
            value={editorContent} 
            onChange={handleContentChange} 
            placeholder="Write your content here... Use markdown formatting."
            className="min-h-[300px] border-0 rounded-none focus:ring-0 resize-y"
          />
        </TabsContent>
        <TabsContent value="preview" className="p-4 prose prose-sm max-w-none dark:prose-invert">
          <div 
            className="preview-content min-h-[300px]"
            dangerouslySetInnerHTML={{ __html: formatHTML(editorContent) }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RichTextEditor;
