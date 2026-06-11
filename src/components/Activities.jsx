import React from 'react';

export default function Activities({ activities }) {
    const displayActivities = activities || [];

    return (
        <section className="activities" id="atividades">
            <div className="container">
                <h2>Atividades</h2>
                <div className="activities-grid">
                    {displayActivities.map((activity, index) => {
                        return (
                            <a key={index} href={activity.link || '#'} target="_blank" rel="noreferrer" className="activity-card">
                                {activity.img ? (
                                    <div className="activity-bg" style={{backgroundImage: `url('${activity.img}')`}}></div>
                                ) : (
                                    <div className="activity-bg" style={{backgroundColor: '#fce7f3'}}></div>
                                )}
                                <div className="activity-overlay">
                                    <h3>{activity.title}</h3>
                                    <p>{activity.description}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
