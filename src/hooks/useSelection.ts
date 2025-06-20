import { useEffect, useState } from "react";

export default function useSelection(items: any[] = []) {
    const [mainChecked, setMainChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    
    useEffect(() => {
        const newCheckedItems: Record<string, boolean> = {};
        items.forEach(item => {
            newCheckedItems[item.id] = mainChecked;
        });
        setCheckedItems(newCheckedItems);
    }, [mainChecked, items]);
    
    const handleItemChange = (id: string, checked: boolean) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: checked
        }));
    };
    
    const resetSelections = () => {
        setMainChecked(false);
        setCheckedItems({});
    };
    
    return {
        mainChecked,
        setMainChecked,
        checkedItems,
        handleItemChange,
        resetSelections,
    };
};