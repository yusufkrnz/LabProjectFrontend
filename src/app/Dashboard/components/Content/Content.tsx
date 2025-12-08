import React from "react"
import './Content.css';

type ContentProps = {
    activePage: string;
};

const pages: Record<string, JSX.Element> = {

    "market-place-pool": <h2>Market Place</h2>,
    "talent-market-place-pool": <h2>Talent Market Place</h2>,
    "work-market-place-pool": <h2>Work Market Place</h2>,
    "hiring-market-place-pool": <h2>Hiring Market Place</h2>,

};

export default function Content({ activePage }: ContentProps) {

    return (
        <div className="content">
            {pages[activePage] ?? <h2> SAYFA BULUNAMADI </h2>}
        </div>
    );
}