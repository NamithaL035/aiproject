import React, { useState } from 'react';
import MermaidDiagram from './MermaidDiagram';
import CodeBlock from './CodeBlock';
import { AssistantIcon, ChevronDownIcon } from './icons';

const capitalizeFirstLetter = (string: string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatKey = (key: string) => {
    return capitalizeFirstLetter(key.replace(/_/g, ' '));
};

const RenderValue: React.FC<{ value: any; isNested?: boolean }> = ({ value, isNested = false }) => {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return (
            <p className={`text-[var(--color-text-secondary)] ${typeof value === 'number' ? 'font-medium text-[var(--color-primary)]' : ''}`}>
                {String(value)}
            </p>
        );
    }

    if (Array.isArray(value)) {
        return (
            <div className="space-y-4">
                {value.map((item, index) => (
                    <div key={index} className="neumorphic-inset p-4 rounded-lg">
                        <RenderValue value={item} isNested={true} />
                    </div>
                ))}
            </div>
        );
    }

    if (typeof value === 'object' && value !== null) {
        return (
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 ${isNested ? '' : 'neumorphic-inset p-6 rounded-xl'}`}>
                {Object.entries(value).map(([key, val]) => (
                    <div key={key}>
                        <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-1">{formatKey(key)}</h4>
                        <RenderValue value={val} isNested={true} />
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const GroceryPlanSkeleton: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="skeleton-loader h-24 rounded-lg"></div>
                <div className="skeleton-loader h-24 rounded-lg"></div>
            </div>
            <div className="neumorphic-inset rounded-xl p-4 space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="skeleton-item-container neumorphic-inset !p-0"
                        style={{ animationDelay: `${index * 0.8}s` }}
                    >
                        {/* Always visible part */}
                        <div className="flex justify-between items-center h-16 px-4">
                            <div className="space-y-2 w-3/5">
                                <div className="skeleton-loader h-4 w-full rounded-md"></div>
                                <div className="skeleton-loader h-3 w-3/4 rounded-md"></div>
                            </div>
                            <div className="skeleton-loader h-6 w-1/4 rounded-md"></div>
                        </div>
                        {/* Expanding part */}
                        <div className="skeleton-comparison-details space-y-2 px-4 pb-4">
                            <h4 className="skeleton-loader h-4 w-1/3 rounded-md mb-2"></h4>
                            <div className="skeleton-loader h-12 rounded-lg"></div>
                            <div className="skeleton-loader h-12 rounded-lg"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ResultDisplay: React.FC<{ data: any; isLoading?: boolean }> = ({ data, isLoading = false }) => {
    const [expandedItem, setExpandedItem] = useState<number | null>(null);

    // If loading is true and it's a grocery plan context (data is null initially)
    if (isLoading && !data) {
        return <GroceryPlanSkeleton />;
    }

    if (!data) return null;

    // Special handling for grocery list to create a table-like structure
    if (data.items && Array.isArray(data.items)) {
        const currencyFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });
        
        const toggleItem = (index: number) => {
            setExpandedItem(expandedItem === index ? null : index);
        };

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="neumorphic-convex p-4 rounded-lg">
                        <p className="text-sm text-[var(--color-primary)] font-semibold">Total Budget</p>
                        <p className="text-2xl font-bold text-[var(--color-text-primary)]">{currencyFormatter.format(data.total_budget)}</p>
                    </div>
                     <div className="neumorphic-convex p-4 rounded-lg">
                        <p className="text-sm text-green-500 font-semibold">Estimated Total</p>
                        <p className="text-2xl font-bold text-[var(--color-text-primary)]">{currencyFormatter.format(data.estimated_total)}</p>
                    </div>
                </div>
                <div className="neumorphic-inset rounded-xl overflow-hidden">
                    <ul className="divide-y divide-[var(--shadow-dark)]">
                        {data.items.map((item: any, index: number) => {
                            const isExpanded = expandedItem === index;
                            return (
                                <li key={index} className="p-4">
                                    <div className="flex justify-between items-start cursor-pointer" onClick={() => toggleItem(index)}>
                                        <div>
                                            <p className="font-semibold text-[var(--color-text-primary)]">{item.name}</p>
                                            <p className="text-sm text-[var(--color-text-secondary)]">{item.quantity} • <span className="font-medium">{item.category}</span></p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <p className="font-bold text-lg text-[var(--color-text-primary)] whitespace-nowrap pl-4">{currencyFormatter.format(item.approx_cost)}</p>
                                            <ChevronDownIcon className={`w-5 h-5 text-[var(--color-text-secondary)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>
                                    <div className={`comparison-details ${isExpanded ? 'expanded' : ''}`}>
                                        {item.price_comparison && (
                                            <div className="pl-4 border-l-2 border-[var(--color-primary)]/50">
                                                <h4 className="font-semibold text-sm text-[var(--color-text-primary)] mb-2">Price Comparison</h4>
                                                <div className="space-y-2">
                                                    {item.price_comparison.map((comp: any, compIndex: number) => (
                                                        <div 
                                                            key={compIndex} 
                                                            className="flex flex-col sm:flex-row justify-between sm:items-center neumorphic-inset p-3 rounded-lg gap-2 comparison-item-enter"
                                                            style={{ animationDelay: `${compIndex * 100}ms` }}
                                                        >
                                                            <div className="flex-1">
                                                                <p className="font-medium text-[var(--color-text-primary)]">{comp.vendor}</p>
                                                                {comp.quality_notes && <p className="text-xs text-[var(--color-text-secondary)] italic">"{comp.quality_notes}"</p>}
                                                            </div>
                                                            <div className="text-left sm:text-right flex-shrink-0">
                                                               <p className="font-bold text-base text-[var(--color-primary)]">{currencyFormatter.format(comp.price)}</p>
                                                               {comp.url && (
                                                                   <a href={comp.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-500 hover:underline">
                                                                       Shop on {comp.vendor} &rarr;
                                                                   </a>
                                                               )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-[var(--color-text-secondary)] mt-3 italic">
                                                    *Prices and links are AI-generated. Availability and final prices must be verified on the vendor's site.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }


    return (
        <div className="space-y-6">
            {Object.entries(data).map(([key, value]) => (
                <section key={key} className="card !p-0 overflow-hidden">
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] px-6 py-4 border-b border-[var(--shadow-dark)]">
                        {formatKey(key)}
                    </h3>
                    <div className="p-6">
                        {key === 'architecture_diagram' && typeof value === 'string' ? (
                            <MermaidDiagram chart={value} />
                        ) : key === 'one_page_readme' && typeof value === 'string' ? (
                            <CodeBlock content={value} language='markdown' />
                        ) : key === 'data_schema' && typeof value === 'string' ? (
                            <CodeBlock content={value} language='sql' />
                        ) : key === 'sample_synthetic_data' && typeof value === 'object' && value !== null ? (
                             // @ts-ignore
                            <CodeBlock content={value.content} language='json' title={value.filename}/>
                        ) : (
                            <RenderValue value={value} />
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default ResultDisplay;