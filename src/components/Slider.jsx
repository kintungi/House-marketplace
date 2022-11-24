import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {collection, getDocs, query, orderBy, limit} from "firebase/firestore"
import { db } from '../lib/firebase.config'
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/swiper-bundle.css"
import "swiper/css"
import Spinner from './Spinner'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Slider() {
    const [loading, setLoading] = useState(true)
    const [listing, setListing] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {

        const fetchListing = async () => {
            const listingRef = collection(db, "listing")
        const q = query(listingRef, orderBy("timestamp", "desc"), limit(5))

        const querySnap = await getDocs(q)

        let listing = [] 

        querySnap.forEach(doc => {
            return listing.push({
                id: doc.id,
                data: doc.data()
            })
        })

        // console.log(listing)
        setListing(listing)
        setLoading(false)
        }

        fetchListing()
        
    },[])

    if(loading) {
        return <Spinner />
    }
  return listing && (
    <>
        <p className="exploreHeading">Recommended</p>

        <Swiper slidesPerView={1} pagination={{clickable: true}}>
            {listing.map(({data,id}) => (
                <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                    <div className="swiperSlideDiv" style={{
                        background: `url(${data.imgUrls[0]}) center no-repeat`,
                        backgroundSize: "cover"
                    }}>
                        <p className="swiperSlideText">{data.name}</p>
                        <p className="swiperSlidePrice">{
                            data.discountedPrice ?? data.regularPrice
                        }{" "}
                        {data.type === "rent" && "/ month"}
                        </p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </>
  )
}

export default Slider
