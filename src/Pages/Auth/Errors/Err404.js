import { Link } from "react-router-dom";
import "./Err404.css"

export default function Err404(){
    return(
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-12 text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center">404</h1>
                            </div>
                            <div className="contant_box_404">
                                <h3>Look like you're lost</h3>
                                <p>the page you are looking for is not available</p>
                                <Link to={"/"} className="link_404">
                                    Go To Home
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}