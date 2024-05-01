import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import menu from './Images/menu.png';
import './App.css';

// Component for our guides page
function Guides() {
    // Guides catalog with search bar
    
    const [guides, setGuides] = useState([]);
    const [openGuideIndex, setOpenGuideIndex] = useState(null);
    const [guidesView, setGuidesView] = useState(0);
    const [selectedGuide, setSelectedGuide] = useState(null);

    let numGuides = Number(guides.length);

    useEffect(() => {
        fetchGuides();
    }, []);

    const toggleState = (index) => {
        if (openGuideIndex === index) {
            setOpenGuideIndex(null);
        } else {
            setOpenGuideIndex(index);
        }
    }

    const fetchGuides = async () => {
        try {
            const response = await fetch('http://localhost:8082/listGuides');
            const guides = await response.json();
            setGuides(guides);
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
    }

    const deleteGuide = async (id) => {
        try {
            const response = await fetch(`http://localhost:8082/deleteGuide/${id}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json'},
                body: JSON.stringify(
                    { "id": id }
                )
            });
            const result = await response.json();
            await fetchGuides();
            setGuidesView(0);
        } catch (error) {
            console.error('Error ', error);
        }
    }

    const addGuide = async (data) => {
        try {
            const response = await fetch("http://localhost:8082/addGuide", {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify ({
                "id": Number(data.id),
                "location": data.location,
                "pois": data.pois,
                "food": data.food,
                "when": data.when,
                "items": data.items,
                "image": data.image
              })
            })
    
            const result = await response.json();
            await fetchGuides();
            setGuidesView(0);
          } catch (error) {
            console.error('Failed to add the product: ', error);
          }
    }

    const updateGuide = async (data) => {
        try {
            const response = await fetch(`http://localhost:8082/updateGuide/${data.id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(
                    {
                        "id": data.id,
                        "location": data.location,
                        "pois": data.pois,
                        "food": data.food,
                        "when": data.when,
                        "items": data.items,
                        "image": data.image,
                    }
                )
            });

            await fetchGuides();
            setGuidesView(0);
        } catch (error) {
            console.error('Error ', error);
        }
    }

    const renderGuides = (guides) => {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>View Guides Posted By Others!</h1>
                    <div>
                        <button
                            type='button' 
                            className="btn btn-success text-white rounded" 
                            style={{ marginRight: '10px' }}
                            onClick={() => setGuidesView(1)}
                            >Add New
                        </button>
                        <button
                            type='button'
                            className="btn btn-primary text-white rounded"
                            style={{ marginRight: '10px' }}
                            onClick={() => setGuidesView(3)}
                        >Update
                        </button>
                        <button 
                            type='button' 
                            className="btn btn-danger rounded"
                            onClick={() => {setGuidesView(2); setSelectedGuide(null)}}
                            >Delete
                        </button>
                    </div>
                </div>

                <hr />

                <div className="row row-cols-3 g-3">
                        {guides.map((guide, index) => (
                            <div key={index} className="col">
                                <div className="card shadow-sm">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                                        <h2>{guide.location} <p style={{ fontSize: '10px' }}>(id: {guide.id})</p></h2>
                                        <img src={menu} className="card-img-top" alt="picture" onClick={() => toggleState(index)} style={{ width: '24px', cursor: 'pointer'}} />
                                    </div>
                                    {openGuideIndex === index && (
                                    <div className={`d-flex flex-column flex-shrink-0 p-3 text-black `}>
                                        <img src={guide.image} alt="picture" className="card-img-top" />
                                        <p><strong>Places of Interest:</strong> {guide.pois}</p>
                                        <p><strong>Places to Eat:</strong> {guide.food}</p>
                                        <p><strong>When to Visit:</strong> {guide.when}</p>
                                        <p><strong>What to Bring:</strong> {guide.items}</p>
                                    </div>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        )
    }

    function Main() {
        return (
            <div>
                {renderGuides(guides)}
            </div>
        )
    }

    function AddGuide() {
        const {
            register,
            handleSubmit,
            formState: { errors },
            reset
          } = useForm();

        const onSubmit = (data) => {
            console.log(data); // log all data
            addGuide(data);
            reset();
        };
        
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>Add a Guide! (Currently {numGuides} Guides)</h1>
                    <button type='button' 
                        className="btn btn-danger text-white rounded" 
                        style={{ marginRight: '10px' }}
                        onClick={() => {setGuidesView(0); reset()}}
                        >Back
                    </button>
                </div>

                <hr />

                <form onSubmit={handleSubmit(onSubmit)} className="container mt-5" style={{ width: 500 }}>
                    <div style={{ marginBottom: '10px' }}>
                    <input
                        {...register("id", { required: true })}
                        placeholder="Guide ID"
                        className="form-control"
                        type="number"
                        style={{ marginBottom: '5px' }}
                    />
                    {errors.id && (
                        <p className="text-danger">Guide: ID is reqiured.</p>
                    )}

                    <input
                        {...register("location", { required: true })}
                        placeholder="Location"
                        className="form-control"
                        type="text"
                        style={{ marginBottom: '5px' }}
                    />
                    {errors.location && (
                        <p className="text-danger">Guide: Location is required.</p>
                    )}

                    <input
                        {...register("pois", { required: true })}
                        placeholder="What is there to see?"
                        className="form-control"
                        type="text"
                        style={{ marginBottom: '5px' }}
                    />
                    {errors.pois && (
                        <p className="text-danger">Guide: POIs are required.</p>
                    )}

                    <input
                        {...register("food", { required: true })}
                        placeholder="What is there to eat?"
                        className="form-control"
                        type="text"
                        style={{ marginBottom: '5px' }}
                    />
                    {errors.food && (
                        <p className="text-danger">Guide: Food locations are required.</p>
                    )}

                    <input
                        {...register("when", { required: true })}
                        placeholder="When is it best to go?"
                        className="form-control"
                        type="text"
                        style={{ marginBottom: '5px' }}
                    />
                    {errors.when && (
                        <p className="text-danger">Guide: Best time to go is required.</p>
                    )}

                    <input
                        {...register("items", { required: true })}
                        placeholder="What should you bring?"
                        className="form-control"
                        type="text"
                        style={{ marginBottom: '5px' }}
                    />
                    {errors.items && (
                        <p className="text-danger">Guide: Items to bring is required.</p>
                    )}

                    <input
                        {...register("image", { required: true })}
                        placeholder="Link to image"
                        className="form-control"
                        type="text"
                        style={{ marginBottom: '5px' }}
                    />
                    {errors.image && (
                        <p className="text-danger">Guide: Image link is required.</p>
                    )}

                    <button
                        type="submit"
                        className="btn btn-success"
                    >Submit
                    </button>
                    </div>
                </form>
            </div>
        )
    }

    function DeleteGuide() {

        function RenderDelete() {
            if (!selectedGuide) return <p>No Guide Selected</p>;

            return (
                <div className="row row-cols-3 g-3">
                    <div className="col">
                        <h3>Are you sure you would like to delete this guide?</h3>
                        <div className="card shadow-sm" style={{marginBottom: '10px'}}>
                            <h2>{selectedGuide.location} <p style={{ fontSize: '10px' }}>(id: {selectedGuide.id})</p></h2>
                            <div className={`d-flex flex-column flex-shrink-0 p-3 text-black `}>
                                <p><strong>Places of Interest:</strong> {selectedGuide.pois}</p>
                                <p><strong>Places to Eat:</strong> {selectedGuide.food}</p>
                                <p><strong>When to Visit:</strong> {selectedGuide.when}</p>
                                <p><strong>What to Bring:</strong> {selectedGuide.items}</p>
                            </div>
                        </div>
                        <button type='button' className="btn btn-success rounded" onClick={() => deleteGuide(selectedGuide.id)}style={{ marginRight: '10px' }}>Confirm</button>
                        <button type='button' className="btn btn-danger rounded" onClick={() => {setSelectedGuide(null); setGuidesView(0)}}>Back</button>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>Remove a Guide</h1>
                    <button type='button' 
                        className="btn btn-danger text-white rounded" 
                        style={{ marginRight: '10px' }}
                        onClick={() => setGuidesView(0)}
                        >Back
                    </button>
                </div>

                <hr />

                <div>
                    <p>ID of Guide to Delete:
                        <input type="text" id="guideNum" placeholder="Enter Guide ID"/>
                    </p>

                    <button 
                        type='button' 
                        className='btn btn-danger rounded' 
                        onClick={() => setSelectedGuide(guides[document.getElementById("guideNum").value - 1])}
                        style={{ marginBottom: '10px' }}
                        >Delete
                    </button>

                    <div>
                        <RenderDelete />
                    </div>
                </div>
            </div>
        )
    }

    function UpdateGuide() {
        const {
            register,
            handleSubmit,
            formState: { errors },
            reset
        } = useForm();

        const onSubmit = (data) => {
            console.log(data); // log all data
            updateGuide(data);
            setSelectedGuide(null);
            reset();
        };

        function RenderUpdate() {
            if (!selectedGuide) return <p>No Guide Selected</p>;

            return (
                <div className="row row-cols-3 g-3">
                    <div className="col">
                        <h3>Selected Guide to Update:</h3>
                        <div className="card shadow-sm" style={{marginBottom: '10px'}}>
                            <h2>{selectedGuide.location} <p style={{ fontSize: '10px' }}>(id: {selectedGuide.id})</p></h2>
                            <div className={`d-flex flex-column flex-shrink-0 p-3 text-black `}>
                                <p><strong>Places of Interest:</strong> {selectedGuide.pois}</p>
                                <p><strong>Places to Eat:</strong> {selectedGuide.food}</p>
                                <p><strong>When to Visit:</strong> {selectedGuide.when}</p>
                                <p><strong>What to Bring:</strong> {selectedGuide.items}</p>
                                <p style={{ fontSize: '15px' }}>{selectedGuide.image}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <h3>Update Form:</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5" style={{ width: 500 }}>
                            <div style={{ marginBottom: '10px' }}>
                                <input
                                    {...register("id", { required: true })}
                                    placeholder="Guide ID"
                                    className="form-control"
                                    type="number"
                                    style={{ marginBottom: '5px' }}
                                />
                                {errors.id && (
                                    <p className="text-danger">Guide: ID is reqiured.</p>
                                )}

                                <input
                                    {...register("location", { required: true })}
                                    placeholder="Location"
                                    className="form-control"
                                    type="text"
                                    style={{ marginBottom: '5px' }}
                                />
                                {errors.location && (
                                    <p className="text-danger">Guide: Location is required.</p>
                                )}

                                <input
                                    {...register("pois", { required: true })}
                                    placeholder="What is there to see?"
                                    className="form-control"
                                    type="text"
                                    style={{ marginBottom: '5px' }}
                                />
                                {errors.pois && (
                                    <p className="text-danger">Guide: POIs are required.</p>
                                )}

                                <input
                                    {...register("food", { required: true })}
                                    placeholder="What is there to eat?"
                                    className="form-control"
                                    type="text"
                                    style={{ marginBottom: '5px' }}
                                />
                                {errors.food && (
                                    <p className="text-danger">Guide: Food locations are required.</p>
                                )}

                                <input
                                    {...register("when", { required: true })}
                                    placeholder="When is it best to go?"
                                    className="form-control"
                                    type="text"
                                    style={{ marginBottom: '5px' }}
                                />
                                {errors.when && (
                                    <p className="text-danger">Guide: Best time to go is required.</p>
                                )}

                                <input
                                    {...register("items", { required: true })}
                                    placeholder="What should you bring?"
                                    className="form-control"
                                    type="text"
                                    style={{ marginBottom: '5px' }}
                                />
                                {errors.items && (
                                    <p className="text-danger">Guide: Items to bring is required.</p>
                                )}

                                <input
                                    {...register("image", { required: true })}
                                    placeholder="Link to image"
                                    className="form-control"
                                    type="text"
                                    style={{ marginBottom: '5px' }}
                                />
                                {errors.image && (
                                    <p className="text-danger">Guide: Image link is required.</p>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>Add a Guide!</h1>
                    <button type='button' 
                        className="btn btn-danger text-white rounded" 
                        style={{ marginRight: '10px' }}
                        onClick={() => {setGuidesView(0); setSelectedGuide(null); reset()}}
                        >Back
                    </button>
                </div>

                <hr />

                <div>
                    <p>ID of Guide to Update:
                        <input type="text" id="guideNum" placeholder="Enter Guide ID"/>
                    </p>

                    <button 
                        type='button' 
                        className='btn btn-primary rounded' 
                        onClick={() => setSelectedGuide(guides[document.getElementById("guideNum").value - 1])}
                        style={{ marginBottom: '10px' }}
                        >Update
                    </button>

                    <div>
                        <RenderUpdate />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {guidesView === 0 && <Main />}
            {guidesView === 1 && <AddGuide />}
            {guidesView === 2 && <DeleteGuide />}
            {guidesView === 3 && <UpdateGuide />}
        </div>
    );
}

export default Guides;