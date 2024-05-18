import { useEffect, useState } from 'react';
import { get_info } from '../../services/about/api';

interface InfoData {
  title: string;
  data: ContentData[];
}

interface ContentData {
  content: any;
  title: string;
  type: string;
  data: Content[];
}

interface Content {
  title: string;
  content: string;
}

const Info: React.FC = () => {

    const [data, setData] = useState<InfoData[]>([]);
    const [isLoading, setIsLoading] = useState('Loading...');

    useEffect(() => {
        get_info().then(data => {
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
        <div className="main info">
                    {data.map((el, i) => {
                        return(
                            <div className="about" key={i}>
                                <div className="about-title">
                                    <h3>
                                        {el.title}
                                    </h3>
                                </div>
                                <div className="about-block">
                                    {el.data.map((el, i) => {
                                        if(el.type === "multiple") {
                                            return(
                                                <div className="about-content multiple">
                                                        {el.data.map((el, i) => {
                                                            return(
                                                                <div className="about-content" id={i.toString()}>
                                                                    <div className="about-content-title">
                                                                        {el.title}
                                                                    </div>
                                                                    <div className="about-content-text">
                                                                        {el.content}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                </div>
                                            )
                                        }
                                        return(
                                            <div className="about-content" key={i}>
                                                <div className="about-content-title">
                                                    {el.title}
                                                </div>
                                                <div className="about-content-text">
                                                    {el.content}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                        
                    })}
                </div>
        </>
    )
}

export default Info;