import React, { useState } from 'react';
import { ToolItem } from '../types';
import { runToolAlgorithm, ToolExecutionResult } from '../utils/toolExecutors';
import { useApp } from '../context/AppContext';
import {
  Play,
  Copy,
  RotateCcw,
  Download,
  Upload,
  Check,
  Sparkles,
  FileText,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

interface ToolRunnerProps {
  tool: ToolItem;
}

export const ToolRunner: React.FC<ToolRunnerProps> = ({ tool }) => {
  const { addToast } = useApp();

  // Inputs
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ToolExecutionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setFilePreviewUrl(URL.createObjectURL(file));
      } else {
        setFilePreviewUrl(null);
      }
    }
  };

  const handleFormChange = (key: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);

    // Simulate minor 200ms processing feedback
    setTimeout(async () => {
      const res = await runToolAlgorithm(tool.id, {
        text: inputText,
        file: selectedFile || undefined,
        formValues
      });
      setIsRunning(false);
      setResult(res);

      if (res.success) {
        addToast(`Tool "${tool.name}" executed successfully!`, 'success');
      } else if (res.error) {
        addToast(res.error, 'error');
      }
    }, 200);
  };

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    addToast('Output copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputText('');
    setSelectedFile(null);
    setFilePreviewUrl(null);
    setFormValues({});
    setResult(null);
    addToast('Tool inputs reset.', 'info');
  };

  return (
    <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Tool Header & Description */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
            {tool.category} — Free Utility
          </div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">{tool.name}</h2>
          <p className="text-zinc-400 text-xs mt-1 leading-relaxed">{tool.description}</p>
        </div>

        <button
          onClick={handleReset}
          className="p-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 shrink-0"
          title="Reset Inputs"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Input Controls Section */}
      <div className="space-y-4">
        <label className="block text-xs font-extrabold text-zinc-300 uppercase tracking-widest">
          Input & Configuration
        </label>

        {/* Text Area Input */}
        {(tool.inputType === 'textarea' || tool.inputType === 'json' || tool.inputType === 'multiline') && (
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={tool.placeholder || 'Paste or type text data here...'}
            rows={6}
            className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26] font-mono leading-relaxed"
          />
        )}

        {/* Single Line Text / Keyword Input */}
        {(tool.inputType === 'text' || tool.inputType === 'numbers') && (
          <input
            type={tool.inputType === 'numbers' ? 'number' : 'text'}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={tool.placeholder || 'Enter input value...'}
            className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
          />
        )}

        {/* File / Image Upload Dropzone */}
        {(tool.inputType === 'file' || tool.inputType === 'image') && (
          <div className="border-2 border-dashed border-white/10 hover:border-[#F27D26] bg-zinc-950 rounded-2xl p-6 text-center transition-colors">
            <input
              type="file"
              id="file-upload-input"
              onChange={handleFileChange}
              accept={tool.inputType === 'image' ? 'image/*' : tool.category === 'PDF Tools' ? '.pdf' : '*/*'}
              className="hidden"
            />
            <label htmlFor="file-upload-input" className="cursor-pointer space-y-3 block">
              {filePreviewUrl ? (
                <img src={filePreviewUrl} alt="Preview" className="max-h-48 mx-auto rounded-xl object-contain border border-white/10" />
              ) : selectedFile ? (
                <div className="flex items-center justify-center gap-2 text-[#F27D26] text-xs font-bold uppercase tracking-wider">
                  <FileText className="w-6 h-6" />
                  <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-[#F27D26]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">Click or drag file to upload</div>
                    <div className="text-[11px] text-zinc-500 mt-1">
                      {tool.inputType === 'image' ? 'Supports PNG, JPG, WebP, SVG' : 'Supports PDF, TXT, CSV, JSON'} (Runs 100% locally in browser)
                    </div>
                  </div>
                </>
              )}
            </label>
          </div>
        )}

        {/* Form Controls for Specific Custom Tools */}
        {tool.inputType === 'form' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {tool.id === 'password-generator' && (
              <>
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold uppercase text-[11px]">Password Length</label>
                  <input
                    type="number"
                    defaultValue={16}
                    min={8}
                    max={64}
                    onChange={(e) => handleFormChange('length', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-lg text-white"
                  />
                </div>
              </>
            )}

            {tool.id === 'utm-builder' && (
              <>
                <div className="col-span-2">
                  <label className="block text-zinc-400 mb-1 font-bold uppercase text-[11px]">Website URL</label>
                  <input
                    type="url"
                    placeholder="https://branify.store/services"
                    onChange={(e) => handleFormChange('url', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold uppercase text-[11px]">UTM Source</label>
                  <input
                    type="text"
                    placeholder="google / newsletter / facebook"
                    onChange={(e) => handleFormChange('source', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold uppercase text-[11px]">UTM Campaign</label>
                  <input
                    type="text"
                    placeholder="summer_sale_2026"
                    onChange={(e) => handleFormChange('campaign', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-lg text-white"
                  />
                </div>
              </>
            )}

            {tool.id === 'profit-margin-calculator' && (
              <>
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold uppercase text-[11px]">Cost of Service / Goods ($)</label>
                  <input
                    type="number"
                    placeholder="100"
                    onChange={(e) => handleFormChange('cost', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold uppercase text-[11px]">Selling Price / Revenue ($)</label>
                  <input
                    type="number"
                    placeholder="150"
                    onChange={(e) => handleFormChange('revenue', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-lg text-white"
                  />
                </div>
              </>
            )}

            {tool.id === 'invoice-generator' && (
              <>
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold uppercase text-[11px]">Client Business Name</label>
                  <input
                    type="text"
                    placeholder="Acme Enterprise Ltd."
                    onChange={(e) => handleFormChange('clientName', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold uppercase text-[11px]">Service Line Item</label>
                  <input
                    type="text"
                    placeholder="Website Development & Branding"
                    onChange={(e) => handleFormChange('serviceName', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold uppercase text-[11px]">Amount ($)</label>
                  <input
                    type="number"
                    placeholder="799"
                    onChange={(e) => handleFormChange('amount', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold uppercase text-[11px]">Invoice Reference Code</label>
                  <input
                    type="text"
                    placeholder="INV-2026-001"
                    onChange={(e) => handleFormChange('invoiceNum', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-lg text-white"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Execute Action Button */}
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="w-full py-4 bg-[#F27D26] hover:bg-orange-500 text-black font-extrabold text-xs sm:text-sm uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isRunning ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              Run {tool.name}
            </>
          )}
        </button>
      </div>

      {/* Output Display Section */}
      {result && (
        <div className="pt-4 border-t border-white/10 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#F27D26] uppercase tracking-widest flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              Tool Output Result
            </span>

            <div className="flex items-center gap-2">
              {result.textOutput && (
                <button
                  onClick={() => handleCopy(result.textOutput!)}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#F27D26]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              )}

              {result.imageOutputUrl && (
                <a
                  href={result.imageOutputUrl}
                  download={result.downloadFilename || 'branify_output.png'}
                  className="px-3 py-1.5 bg-[#F27D26] hover:bg-orange-500 text-black text-xs font-extrabold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Image
                </a>
              )}
            </div>
          </div>

          {/* Error Banner */}
          {result.error && (
            <div className="p-4 bg-rose-950/80 border border-rose-500/50 rounded-xl text-rose-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{result.error}</span>
            </div>
          )}

          {/* Text / Code Output */}
          {result.textOutput && (
            <pre className="p-4 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-200 font-mono whitespace-pre-wrap break-all max-h-80 overflow-y-auto leading-relaxed">
              {result.textOutput}
            </pre>
          )}

          {/* Rendered HTML Preview */}
          {result.htmlOutput && (
            <div
              className="p-4 bg-zinc-950 border border-white/10 rounded-xl"
              dangerouslySetInnerHTML={{ __html: result.htmlOutput }}
            />
          )}

          {/* Rendered Image Output */}
          {result.imageOutputUrl && (
            <div className="p-4 bg-zinc-950 border border-white/10 rounded-xl text-center space-y-3">
              <img
                src={result.imageOutputUrl}
                alt="Tool Result Output"
                className="max-h-72 mx-auto rounded-xl shadow-lg border border-white/10 object-contain"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
