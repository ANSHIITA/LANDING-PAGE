
import React, { useState, useCallback } from 'react';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { generateProductDescription } from './services/geminiService';
import type { ProductData } from './types';
import { LogoIcon } from './constants';


const App: React.FC = () => {
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [productImageUrl, setProductImageUrl] = useState<string>('https://picsum.photos/seed/initial/1024/768');

    const handleGenerate = useCallback(async (productName: string, keywords: string) => {
        setIsLoading(true);
        setError(null);
        setProductData(null);

        // Generate a new random image URL based on the product name
        const seed = productName.replace(/\s+/g, '-').toLowerCase();
        setProductImageUrl(`https://picsum.photos/seed/${seed}/1024/768`);

        try {
            const result = await generateProductDescription(productName, keywords);
            setProductData(result);
        } catch (e) {
            console.error(e);
            setError('Hubo un error al generar la descripción. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            <header className="bg-white border-b border-slate-200 p-4">
                <div className="container mx-auto flex items-center gap-3">
                    <LogoIcon />
                    <h1 className="text-2xl font-bold text-slate-800">
                        Generador de Descripciones para Tiendanube
                    </h1>
                </div>
            </header>
            
            <main className="container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <InputPanel onGenerate={handleGenerate} isLoading={isLoading} />
                    </div>
                    <div className="lg:col-span-8">
                        <OutputPanel 
                            data={productData} 
                            isLoading={isLoading} 
                            error={error}
                            productImageUrl={productImageUrl}
                        />
                    </div>
                </div>
            </main>

            <footer className="text-center p-4 text-slate-500 text-sm mt-8">
                <p>Desarrollado con IA de Gemini. Diseñado para optimizar tu e-commerce.</p>
            </footer>
        </div>
    );
};

export default App;
