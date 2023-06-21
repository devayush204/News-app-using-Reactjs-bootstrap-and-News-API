import React from 'react'

const NewsItems = (props) => {
    

        let {title, description, imgUrl, newsUrl, author, date} = props;

        return (
           
            <div className='my-3 '>

                <div className="card " >
                    <img src={!imgUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBSOsJBW5FJlNJD_xIVn2lJSMDEmD3ZcwJvQ&usqp=CAU":imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small className='text-muted'>By {!author?"Times of India": author} on {new Date(date).toGMTString()}</small></p>
                        <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItems
