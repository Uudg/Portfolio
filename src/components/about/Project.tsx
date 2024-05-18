interface ProjectProps {
        title: string,
        location: string,
        date: string,
        type: string,
}

import "./project.css";

const Project: React.FC<ProjectProps> = (data) => {
    return (
        <>
            <div className="about-project">
                <div className="about-project-title">
                    {data.title}
                </div>
                <div className="about-project-date">
                    {data.date}
                </div>
                <div className="row">
                <div className="about-project-location">
                    {data.location}
                </div>
                <div className={"about-project-type " + data.type}>
                    {data.type}
                </div>
                </div>
            </div>
        </>
    );
};

export default Project;