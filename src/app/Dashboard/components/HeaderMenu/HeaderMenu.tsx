import React from "react";
import '../HeaderMenu/HeaderMenu.css'



type HeaderMenuProps={
    toggleSidebar:()=> void;
    setActivePage:(page:string)=>void;
    
};  

export default function HeaderMenu({ setActivePage }:HeaderMenuProps) {

    return (
        
        <div className="header-menu">

            <button className="market-place" onClick={() => setActivePage("market-place-pool")}>
                Marketplace
            </button>
            <button className="talent-market-place" onClick={() => setActivePage("talent-market-place-pool")}>
                Talent Marketplace
            </button>
            <button className="work-market-place" onClick={() => setActivePage("work-market-place-pool")}>
                Work Marketplace
            </button>
            <button className="hiring-market-place" onClick={() => setActivePage("hiring-market-place-pool")}>
                Hiring Marketplace
            </button>
        </div>

    );


}