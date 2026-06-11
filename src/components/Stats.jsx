import React from 'react';

export default function Stats({ texts }) {
    return (
        <section className="stats">
            <div className="container">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-number">{texts.statDonation}</div>
                        <div className="stat-label">Valor doado no mês</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{texts.statMembers}</div>
                        <div className="stat-label">Associadas</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{texts.statSales}</div>
                        <div className="stat-label">Produtos vendidos</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
