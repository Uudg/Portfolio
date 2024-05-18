import Project from "./Project";
import { get_social } from "../../services/about/api";
import { useEffect, useState } from "react";

interface ProjectProps {
  title: string;
  description: string;
  // Add other properties as needed
}

const Social: React.FC = () => {
    const [data, setData] = useState<ProjectProps[]>([]);
    const [isLoading, setIsLoading] = useState('Loading...');

    useEffect(() => {
        get_social().then(data => {
            setData(data);
            setIsLoading('');
        })
        .catch(() => {
            setIsLoading('Something went wrong :(')
        })
    }, []); 

    if (isLoading !== '') {
        return <div>{isLoading}</div>;
    }
    return(
        <>
            <div className="socials info">
                {
                data.map((el, i) => {
                        return(
                            <Project location={""} date={""} type={""} key={i} {...el} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default Social;