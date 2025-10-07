import React, { createContext, useContext, useState } from 'react';

type CampaignContextType = {
    campaignId: string | null;
    setCampaignId: (id: string | null) => void;
};

const CampaignContext = createContext<CampaignContextType | undefined>(
    undefined,
);

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [campaignId, setCampaignId] = useState<string | null>(() => {
        return localStorage.getItem('campaignId');
    });
    return (
        <CampaignContext.Provider value={{ campaignId, setCampaignId }}>
            {children}
        </CampaignContext.Provider>
    );
};

export const useCampaign = () => {
    const context = useContext(CampaignContext);
    if (!context)
        throw new Error('useCampaign must be used within a CampaignProvider');
    return context;
};
