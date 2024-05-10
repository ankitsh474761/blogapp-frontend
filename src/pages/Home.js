import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [blogs,setBlogs] = useState([]);

    useEffect(()=>{
    const fetchAllBlogs = async()=>{
        const res = await axios.get("/api/v1/get/allblogs",
        {
        headers:{
          "Authorization" : `Bearer ${localStorage.getItem('token')}`,
    }});
    setBlogs(res.data);
    };
    fetchAllBlogs();
    },[])
  return (
    <>
      <main className="my-5" style={{height:"100vh"}}>
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3 text-4xl text-white  selection:bg-yellow-500 selection:text-black">
              <strong>Latest posts</strong>
            </h2>

            <div className="row">
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => {
                  return (
                    <>
                      <div className="col-lg-4 col-md-12 mb-4 my-2">
                        <div className="card ">
                          <div
                            className="bg-image hover-overlay ripple"
                            data-mdb-ripple-color="light"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                objectFit: "contain",
                                width: "200px",
                                height: "300px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={`https://blogapp-backend-gks2.onrender.com/${item.thumbnail}`}
                                className="img-fluid w-5 h-5 border-4 border-gray-400"
                                height={"300px"}
                                width={"200px"}
                              />
                            </div>

                            <a href="#">
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "rgba(251,251,251,0.15)",
                                }}
                              ></div>
                            </a>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <div className="w-5 h-5 border-4 rounded-2xl  border-gray-800">
                              <p className="card-text selection:bg-yellow-500 selection:text-black">
                                {item.description.substring(0, 60)}...
                              </p>
                            </div>
                            <Link
                              to={`/blog/${item._id}`}
                              className="btn btn-primary"
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <h2>No post available</h2>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-primary text-lg-start">
        <div
          className="text-center p-3 text-white"
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
        >
          @ 2023 Copyright :
          <a className="text-white mx-2" href="https://mdbootstrap.com/">
            Code with Ankit
          </a>
        </div>
      </footer>
    </>
  );
}

export default Home