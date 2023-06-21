import React, { useEffect, useState} from 'react'
import NewsItems from './NewsItems'

import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from './Spinner'

//using axios isntead of fetch
import { axios } from "axios";


const News = (props) =>  {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    document.title = `${capitalizeLetter(props.category)} - NewsMonkey`;
    
  

    const updateNews = async() => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3c849193546d493281832dc1bc630fb2&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json()
        console.log(parsedData)
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    } ,[])

    
    // const handlePrevClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3c849193546d493281832dc1bc630fb2&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    //     // this.setState({loading: true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // console.log(parsedData)
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })
    //     setPage(page - 1)
    //     updateNews();

    // }

    // const handleNextClick = async () => {
    //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {
    //     // }
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3c849193546d493281832dc1bc630fb2&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //     //     this.setState({loading: true});
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json()

    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         articles: parsedData.articles,
    //     //         loading: false
    //     //     }) 
    //     setPage(page + 1)
    //     updateNews();
    // }


    const fetchMoreData = async () => {
        setPage(page + 1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3c849193546d493281832dc1bc630fb2&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

    
        return (
            <> 
                <h1 className='text-center' style={{ margin: "90px 0px" }} >NewsMonkey - Top {capitalizeLetter(props.category)} Headlines</h1>
                {loading && <Spinner/>}

                {/* using infinite scroll */}

                <InfiniteScroll  
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length < totalResults}
                    loader={<Spinner/>}
                >

                    <div className='container'>
                        <div className="row">




                            {/* this is not included in infinite scroll as we are using the infinite scroll ... */}
                            {/* {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url} >
                        <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                        </div>
                    })} */}



                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url} >
                                    <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}


                        </div>

                    </div>
                </InfiniteScroll>

                {/* as we are using infinte scroll theres no need to add these buttons */}
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} > &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            )
            </>
        )
    }


News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: 'general',

}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
