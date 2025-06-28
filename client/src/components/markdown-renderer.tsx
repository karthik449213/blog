interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    // Convert basic markdown to HTML-like JSX
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-3xl font-bold text-slate-900 mt-8 mb-4">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-2xl font-bold text-slate-900 mt-8 mb-4">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-xl font-bold text-slate-900 mt-6 mb-3">
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItems = [line.substring(2)];
        let j = i + 1;
        while (j < lines.length && (lines[j].trim().startsWith('- ') || lines[j].trim().startsWith('* '))) {
          listItems.push(lines[j].trim().substring(2));
          j++;
        }
        elements.push(
          <ul key={i} className="list-disc list-inside text-slate-700 space-y-2 mb-6">
            {listItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
        i = j - 1;
      } else if (line.startsWith('```')) {
        const codeLines = [];
        let j = i + 1;
        while (j < lines.length && !lines[j].trim().startsWith('```')) {
          codeLines.push(lines[j]);
          j++;
        }
        elements.push(
          <div key={i} className="bg-gray-50 rounded-lg p-6 mb-6 border-l-4 border-primary">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              <code>{codeLines.join('\n')}</code>
            </pre>
          </div>
        );
        i = j;
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <p className="text-amber-700 italic">{line.substring(2)}</p>
          </blockquote>
        );
      } else if (line.length > 0) {
        // Convert **bold** and *italic* text
        let processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');
        
        elements.push(
          <p key={i} className="text-slate-700 leading-relaxed mb-6" 
             dangerouslySetInnerHTML={{ __html: processedLine }} />
        );
      }
    }
    
    return elements;
  };

  return (
    <div className="prose prose-lg max-w-none">
      {renderContent(content)}
    </div>
  );
}
