import React, { useState, useContext, useEffect } from 'react'
<<<<<<< HEAD
import { useParams, useNavigate } from 'react-router-dom'
=======
import { useParams } from 'react-router-dom'
import axios from 'axios'
>>>>>>> 9b83253 (Update frontend)
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const product = () => {
<<<<<<< HEAD
  const {productId} = useParams();
  const {products, backendURL} = useContext(ShopContext);
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(false);
  const [ratingInfo, setRatingInfo] = useState({ averageRating: 0, ratingCount: 0 });
=======
  const { productId } = useParams();
  const { products, currency, addToCart, backendURL, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [showBuyNow, setShowBuyNow] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
>>>>>>> 9b83253 (Update frontend)

  const fetchTeacherData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setTeacherData(item);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchTeacherData();
  }, [productId, products])

<<<<<<< HEAD
  useEffect(() => {
    const loadRating = async () => {
      try {
        const teacherId = teacherData?.teacherId || teacherData?._id;
        if (!backendURL || !teacherId) return;
        const res = await axios.get(`${backendURL}/api/user/teacher/${teacherId}/rating`);
        if (res.data.success) {
          setRatingInfo({
            averageRating: res.data.averageRating || 0,
            ratingCount: res.data.ratingCount || 0
          });
        }
      } catch (e) {
        // ignore silently
      }
    };
    loadRating();
  }, [backendURL, teacherData])

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    return stars;
  }

  const handleMessageTeacher = async () => {
    if (!teacherData) return;
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = `user_${Date.now()}`;
      localStorage.setItem('userId', userId);
    }
    const userName = localStorage.getItem('userName') || 'Student';
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/api/chat/get-or-create`, {
        userId,
        userName: userName,
        teacherId: teacherData.teacherId || teacherData._id,
        teacherName: teacherData.fullName,
        teacherImage: (() => {
          if (teacherData.image) {
            if (Array.isArray(teacherData.image) && teacherData.image.length > 0) {
              return teacherData.image[0];
            } else if (typeof teacherData.image === 'string') {
              return teacherData.image;
            }
          }
          return teacherData.profileImageUrl || null;
        })()
      });

      if (response.data.success) {
        navigate('/chat', { 
          state: { 
            teacherId: teacherData.teacherId || teacherData._id,
            chatId: response.data.chat._id
          } 
        });
        toast.success('Chat opened with ' + teacherData.fullName);
      } else {
        toast.error('Failed to start chat');
      }
    } catch (error) {
      console.error('Error starting chat:', error);
      toast.error('Failed to start chat. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return teacherData ? (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          
          {/* Left Column - Teacher Summary */}
          <div className='lg:w-1/3'>
            <div className='bg-white rounded-lg shadow-lg p-6 sticky top-8'>
              
              {/* Profile Header */}
              <div className='text-center mb-6'>
                <div className='w-32 h-32 mx-auto mb-4 relative'>
                  {(() => {
                    let imageUrl = null;
                    if (teacherData.image) {
                      if (Array.isArray(teacherData.image) && teacherData.image.length > 0) {
                        imageUrl = teacherData.image[0];
                      } else if (typeof teacherData.image === 'string') {
                        imageUrl = teacherData.image;
                      }
                    }
                    if (!imageUrl && teacherData.profileImageUrl) {
                      imageUrl = teacherData.profileImageUrl;
                    }
                    return imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={teacherData.fullName || 'Teacher'}
                        className='w-full h-full rounded-full object-cover'
                      />
                    ) : (
                      <div className='w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-4xl'>
                        👨‍🏫
                      </div>
                    );
                  })()}
                  <div className='absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
                </div>
                
                <h1 className='text-2xl font-bold text-gray-900 mb-1'>{teacherData.fullName}</h1>
                <p className='text-lg text-blue-600 font-medium mb-2'>{teacherData.professionalTitle}</p>
                {teacherData.location && (
                  <div className='flex items-center justify-center text-gray-600 mb-2'>
                    <span className='mr-1'>📍</span>
                    <span>{teacherData.location}</span>
                  </div>
                )}
                
                <div className='flex items-center justify-center text-sm text-gray-600'>
                  <div className='flex mr-2'>{renderStars(ratingInfo.averageRating || 0)}</div>
                  <span>
                    {ratingInfo.averageRating?.toFixed ? ratingInfo.averageRating.toFixed(1) : (ratingInfo.averageRating || 0)}
                    {` (${ratingInfo.ratingCount || 0} reviews)`}
                  </span>
                </div>
=======
  const buildBuyNowOrder = () => ({
    customerName: customerName.trim(),
    phone: phone.trim(),
    address: address.trim(),
    paymentMethod,
    items: [
      {
        productId: productData._id,
        name: productData.name,
        size,
        quantity: 1,
        price: productData.price,
        subtotal: productData.price,
        image: productData.image?.[0] || '',
      },
    ],
    totalAmount: productData.price,
  })

  const handleBuyNowSubmit = async () => {
    setError('')
    if (!size) {
      setError('Please select a size before buying now.')
      return
    }
    if (!customerName || !phone || !address) {
      setError('Please fill in all order details.')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(backendURL + '/api/order/create', buildBuyNowOrder())
      if (response.data.success) {
        setShowBuyNow(false)
        navigate('/orders')
      } else {
        setError(response.data.message || 'Failed to place order.')
      }
    } catch (err) {
      setError(err.message || 'Failed to place order.')
    } finally {
      setLoading(false)
    }
  }

 
  return productData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* --------------------Product Data ---------------------*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
      {/* --------------------Product Image-------------------- */}
      <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
        {
          productData.image.map((item, index)=>(
            <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shirnk-0 cursor-pointer' alt="" />
          ))
        }
        </div>
        <div className='w-full sm:w-[80%]'>
        <img src={image} className='w-full h-auto' alt="" />
        </div>
        
      </div >
        {/* -----------------------------product info---------------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          
          </div>
          <p className='mt-5 text-2xl font-medium line-through'>{currency}{productData.discount}</p>
          <p className='mt-2 text-3xl font-medium'>{currency}{productData.price}</p>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Quality  Product</p>
              <p>Cash on delivery</p>
              <p>Easy return policy(Defected product)</p>
          </div>
          
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item , index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size? 'border-orange-500' : ''} `} key={index}>{item}</button>
                ))
              }
            </div>
            {!size && <p className='text-sm text-red-600'>Please select a size to continue.</p>}
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <button disabled={!size} onClick={() => addToCart(productData._id, size)} className={`px-8 py-3 text-sm ${!size ? 'cursor-not-allowed bg-slate-400 text-slate-200' : 'bg-black text-white active:bg-gray-700'}`}>
              Add To Cart
            </button>
            <button disabled={!size} onClick={() => setShowBuyNow(true)} className={`px-8 py-3 text-sm ${!size ? 'cursor-not-allowed bg-slate-400 text-slate-200' : 'bg-orange-500 text-white active:bg-orange-600'}`}>
              Buy Now
            </button>
          </div>
          <hr className='mt-8 sm:w-4/5' />
          
        </div>
      </div>
      {/* ---------------Discription and review----------------- */}
      <div className='mt-5'>
        <div className='flex lg:justify-start justify-center'>
          <b className='border px-5 py-3 text-sm'>Description</b>
         

        </div>
              <div className='flex flex-col gap-4 border px-6 py-6 text-m text-gray-500'>
              <pre className='text-center lg:text-left mt-2 ld:text-center text-gray-500 md:w-4/5'>{productData.description}</pre>
>>>>>>> 9b83253 (Update frontend)
              </div>

              {/* Key Metrics */}
              <div className='grid grid-cols-3 gap-4 mb-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-900'>{teacherData.totalStudents?.toLocaleString() || '0'}</div>
                  <div className='text-sm text-gray-600'>Students</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-900'>{teacherData.totalCourses || '0'}</div>
                  <div className='text-sm text-gray-600'>Courses</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-900'>{teacherData.yearsOfExperience || '0+'}</div>
                  <div className='text-sm text-gray-600'>Experience</div>
                </div>
              </div>

<<<<<<< HEAD
              {/* Action Buttons */}
              <div className='space-y-3 mb-6'>
                {teacherData.teacherId && (
                  <button 
                    onClick={handleMessageTeacher}
                    disabled={loading}
                    className='w-full bg-black text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
                  >
                    <span className='mr-2'>💬</span>
                    {loading ? 'Connecting...' : 'Message Teacher'}
                  </button>
                )}
                <button 
                  onClick={() => navigate(`/book-session/${productId}`)}
                  className='w-full border-2 border-black text-black py-3 px-4 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50 transition-colors'
                >
                  <span className='mr-2'>📅</span>
                  Book a Session
                </button>
              </div>
              
              {/* Pricing */}
              {teacherData.hourlyRate && (
                <div className='text-center mb-6'>
                  <div className='text-3xl font-bold text-gray-900'>৳{teacherData.hourlyRate}/hr</div>
                  <div className='text-sm text-gray-500'>Starting price</div>
                </div>
              )}

              {/* Quick Info */}
              <div className='mb-6'>
                <h3 className='font-bold text-gray-900 mb-3'>Quick Info</h3>
                <div className='space-y-2 text-sm'>
                  {teacherData.responseTime && (
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Response time:</span>
                      <span className='font-medium'>{teacherData.responseTime}</span>
                    </div>
                  )}
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Response rate:</span>
                    <span className='font-medium'>100%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Completion rate:</span>
                    <span className='font-medium'>98%</span>
                  </div>
                  {teacherData.availability && (
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Availability:</span>
                      <span className='font-medium'>{teacherData.availability}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Languages */}
              {teacherData.languages && (
                <div>
                  <h3 className='font-bold text-gray-900 mb-3'>Languages</h3>
                  <div className='flex flex-wrap gap-2'>
                    {teacherData.languages.split(',').map((lang, index) => (
                      <span key={index} className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>
                        {lang.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className='lg:w-2/3'>
            <div className='bg-white rounded-lg shadow-lg'>
              
              {/* Navigation Tabs */}
              <div className='border-b border-gray-200'>
                <nav className='flex space-x-8 px-6'>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'about'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'courses'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Courses
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className='p-6'>
                {activeTab === 'about' && (
                  <div className='space-y-6'>
                    <div>
                      <h2 className='text-xl font-bold text-gray-900 mb-4'>About {teacherData.fullName}</h2>
                      <p className='text-gray-700 leading-relaxed'>
                        {teacherData.shortDescription || teacherData.description || 
                         "I'm a passionate educator with extensive experience in my field. I love helping students achieve their goals and build practical skills that matter in today's industry."}
                      </p>
                    </div>
                    {teacherData.specialties && (
                      <div>
                        <h3 className='text-lg font-bold text-gray-900 mb-3'>Specialties</h3>
                        <div className='flex flex-wrap gap-2'>
                          {teacherData.specialties.split(',').map((specialty, index) => (
                            <span key={index} className='bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium'>
                              {specialty.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <h3 className='text-lg font-bold text-gray-900 mb-3'>Certifications</h3>
                      <div className='space-y-2'>
                        <div className='flex items-center text-sm text-gray-700'>
                          <span className='mr-2'>🏆</span>
                          <span>Google Cloud Professional Developer</span>
                        </div>
                        <div className='flex items-center text-sm text-gray-700'>
                          <span className='mr-2'>🏆</span>
                          <span>AWS Certified Solutions Architect</span>
                        </div>
                        <div className='flex items-center text-sm text-gray-700'>
                          <span className='mr-2'>🏆</span>
                          <span>Python Institute Certified Expert</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className='text-lg font-bold text-gray-900 mb-3'>Contact Information</h3>
                      <div className='space-y-2 text-sm text-gray-700'>
                        {teacherData.email && (
                          <div className='flex items-center'>
                            <span className='mr-2'>📧</span>
                            <span>{teacherData.email}</span>
                          </div>
                        )}
                        {teacherData.phone && (
                          <div className='flex items-center'>
                            <span className='mr-2'>📞</span>
                            <span>{teacherData.phone}</span>
                          </div>
                        )}
                        {teacherData.responseTime && (
                          <div className='flex items-center'>
                            <span className='mr-2'>⏱️</span>
                            <span>Response time: {teacherData.responseTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'courses' && (
                  <div>
                    <h2 className='text-xl font-bold text-gray-900 mb-4'>Courses by {teacherData.fullName}</h2>
                    <div className='text-gray-600'>
                      <p>This teacher has {teacherData.totalCourses || 0} courses available.</p>
                      <p className='mt-2'>Course details and enrollment options will be displayed here.</p>
                    </div>
                  </div>
                )}
=======
      {showBuyNow && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'>
          <div className='w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-sm uppercase tracking-[0.3em] text-slate-500'>Quick checkout</p>
                <h2 className='text-2xl font-semibold text-slate-900'>Buy now for {productData.name}</h2>
                <p className='mt-1 text-sm text-slate-500'>Selected size: <span className='font-semibold text-slate-900'>{size || 'None'}</span></p>
              </div>
              <button onClick={() => setShowBuyNow(false)} className='text-slate-400 hover:text-slate-700'>Close</button>
            </div>

            <div className='mt-6 grid gap-4'>
              <input
                className='border border-slate-300 rounded py-2 px-3 w-full'
                placeholder='Your Name'
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                className='border border-slate-300 rounded py-2 px-3 w-full'
                placeholder='Phone Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                className='border border-slate-300 rounded py-2 px-3 w-full'
                rows='4'
                placeholder='Full Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className='flex gap-3'>
                <button type='button' onClick={() => setPaymentMethod('cod')} className={`flex-1 rounded-lg border px-4 py-3 text-sm ${paymentMethod === 'cod' ? 'border-black bg-slate-100' : 'border-slate-300 bg-white'}`}>
                  Cash on delivery
                </button>
                <button type='button' onClick={() => setPaymentMethod('bkash')} className={`flex-1 rounded-lg border px-4 py-3 text-sm ${paymentMethod === 'bkash' ? 'border-black bg-slate-100' : 'border-slate-300 bg-white'}`}>
                  bKash
                </button>
              </div>
              {error && <p className='text-red-600 text-sm'>{error}</p>}
              <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end'>
                <button type='button' onClick={() => setShowBuyNow(false)} className='rounded-lg border border-slate-300 px-5 py-3 text-sm text-slate-600 hover:bg-slate-100'>Cancel</button>
                <button type='button' onClick={handleBuyNowSubmit} disabled={loading} className='rounded-lg bg-black px-5 py-3 text-sm text-white hover:bg-slate-800'>
                  {loading ? 'Processing...' : 'Confirm Purchase'}
                </button>
>>>>>>> 9b83253 (Update frontend)
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
      </div>
=======
      )}

>>>>>>> 9b83253 (Update frontend)
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <div className='text-6xl mb-4'>👨‍🏫</div>
        <h2 className='text-2xl font-bold text-gray-600 mb-2'>Loading Teacher Profile...</h2>
        <p className='text-gray-500'>Please wait while we fetch the teacher information.</p>
      </div>
    </div>
  )
}

export default product
