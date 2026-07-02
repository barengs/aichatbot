import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import api from '../../lib/axios';

export default function AISettingsPage() {
    const [aiProvider, setAiProvider] = useState('gemini');
    const [defaultModel, setDefaultModel] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [lastApplied, setLastApplied] = useState('Never');

    useEffect(() => {
        api.get('/admin/settings').then(res => {
            const settings = res.data.settings || {};
            if (settings.aiProvider) setAiProvider(settings.aiProvider);
            if (settings.defaultModel) setDefaultModel(settings.defaultModel);
            if (settings.apiKey) setApiKey(settings.apiKey);
            if (settings.systemPrompt) setSystemPrompt(settings.systemPrompt);
            if (settings.lastApplied) setLastApplied(settings.lastApplied);
        }).catch(err => console.error("Error loading settings:", err));
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const now = new Date().toLocaleString();
            await api.post('/admin/settings', {
                settings: {
                    aiProvider,
                    defaultModel,
                    apiKey,
                    systemPrompt,
                    lastApplied: now
                }
            });
            setLastApplied(now);
            alert('Configuration saved successfully!');
        } catch (error) {
            console.error("Error saving settings:", error);
            alert('Failed to save configuration');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#F8FAFC]">
            <div className="p-8 pb-4">
                <div className="mb-2">
                    <p className="text-xs text-gray-500 font-medium mb-1">Admin / <span className="text-gray-900 font-bold">System Console</span></p>
                    <h1 className="text-3xl font-bold text-[#0F3B2C]">AI Settings</h1>
                    <p className="text-sm text-gray-500 mt-1">Configure AI model parameters for TaniCerdas SMK.</p>
                </div>
            </div>

            <div className="flex-1 p-8 m-0 outline-none flex flex-col h-full">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-left max-w-3xl flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">AI Model Parameters</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">AI Provider</label>
                                <select 
                                    className="w-full h-10 rounded-md border border-gray-200 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3B2C]/20 focus:border-[#0F3B2C] text-sm"
                                    value={aiProvider}
                                    onChange={(e) => setAiProvider(e.target.value)}
                                >
                                    <option value="gemini">Google Gemini (Recommended)</option>
                                    <option value="openai">OpenAI</option>
                                    <option value="anthropic">Anthropic</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Default Model</label>
                                <Input 
                                    type="text" 
                                    placeholder="e.g., gemini-1.5-pro" 
                                    className="rounded-md" 
                                    value={defaultModel}
                                    onChange={(e) => setDefaultModel(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                            <Input 
                                type="password" 
                                placeholder="Enter your API key" 
                                className="rounded-md" 
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">Your API key is encrypted and stored securely.</p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">System Prompt</label>
                            <textarea 
                                className="w-full rounded-md border border-gray-200 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3B2C]/20 focus:border-[#0F3B2C] text-sm min-h-[120px]" 
                                placeholder="You are a helpful agricultural assistant for SMK students..."
                                value={systemPrompt}
                                onChange={(e) => setSystemPrompt(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="mt-8 p-4 bg-white border border-gray-200 flex items-center justify-between rounded-xl shadow-sm max-w-3xl">
                    <span className="text-sm text-gray-500 font-medium">Last applied: <span className="text-gray-900 font-bold">{lastApplied === 'Never' ? 'Never' : `${lastApplied} by admin`}</span></span>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-md px-6">Discard Changes</Button>
                        <Button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-[#0F3B2C] hover:bg-[#154E3A] rounded-md px-6 flex items-center gap-2 disabled:opacity-70"
                        >
                            {isSaving ? (
                                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-1"></div>
                            ) : (
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1464 4.14645C11.3417 4.34171 11.3417 4.65829 11.1464 4.85355L6.14645 9.85355C5.95118 10.0488 5.6346 10.0488 5.43934 9.85355L3.43934 7.85355C3.24408 7.65829 3.24408 7.34171 3.43934 7.14645C3.6346 6.95118 3.95118 6.95118 4.14645 7.14645L5.79289 8.79289L10.4393 4.14645C10.6346 3.95118 10.9512 3.95118 11.1464 4.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            )}
                            {isSaving ? 'Saving...' : 'Apply & Save'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
