import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

const ViewHotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [lang, setLang] = useState('en'); // en or ar

  useEffect(() => {
    // console.log("🪪 Route param ID received:", id);

    if (!id || id.length !== 24) {
      console.warn("❌ Invalid ID format:", id);
      return;
    }

    api.getHotel(id)
      .then(res => setHotel(res.data))
      .catch(err => console.error('Failed to fetch hotel:', err));
      setHotel(null);
  }, [id]);

  if (hotel === null) return <p className="text-danger text-center mt-4">Hotel not found.</p>;


  const getTranslated = (value) => {
    if (typeof value === 'object' && value !== null) {
      return value[lang] || value['en'] || '—';
    }
    return value;
  };

  return (
    <div className="container mt-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{getTranslated(hotel.name)}</h2>
        <div>
          <button className="btn btn-outline-primary btn-sm me-2" onClick={() => setLang('en')}>EN</button>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setLang('ar')}>AR</button>
        </div>
      </div>

      {/* Image Section */}
      {hotel.photo?.[0]?.url && (
        <div className="mb-4">
          <img src={hotel.photo[0].url} alt="Hotel Cover" className="img-fluid rounded w-100" style={{ height: '300px', objectFit: 'cover' }} />
        </div>
      )}

      {/* Hotel Info */}
      <div className="mb-3">
        <p><strong>{lang === 'ar' ? 'العنوان' : 'Address'}:</strong> {getTranslated(hotel.address)}</p>
        <p><strong>{lang === 'ar' ? 'الوجهة' : 'Destination'}:</strong> {getTranslated(hotel.destination?.name)}</p>
        <p><strong>{lang === 'ar' ? 'التقييم' : 'Rating'}:</strong> ⭐ {hotel.star} | {hotel.rating}</p>
        <p><strong>{lang === 'ar' ? 'السعر من' : 'Starting Price'}:</strong> ₹{hotel.priceFrom}</p>
      </div>

      {/* Room Types */}
      <h4 className="mt-5 mb-3 border-bottom pb-2">{lang === 'ar' ? 'أنواع الغرف' : 'Room Types'}</h4>
      {hotel.roomType?.map((room, i) => (
        <div key={i} className="border rounded p-3 mb-3 shadow-sm">
          <h5>{getTranslated(room.name)}</h5>
          <p><strong>{lang === 'ar' ? 'السعر' : 'Price'}:</strong> ₹{room.price}</p>
          <p><strong>{lang === 'ar' ? 'المرافق' : 'Facilities'}:</strong></p>
          <ul>
            {room.facilities?.map((f, j) => (
              <li key={j}>{getTranslated(f)}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Nearby Attractions */}
      <h4 className="mt-5 mb-3 border-bottom pb-2">{lang === 'ar' ? 'المعالم القريبة' : 'Nearby Attractions'}</h4>
      {hotel.nearByAttractions?.length > 0 ? (
        <ul className="list-group mb-4">
          {hotel.nearByAttractions.map((a, i) => (
            <li key={i} className="list-group-item">
              {getTranslated(a.name)} - {a.distance}
            </li>
          ))}
        </ul>
      ) : (
        <p>{lang === 'ar' ? 'لا توجد معالم مدرجة.' : 'No attractions listed.'}</p>
      )}

      <Link to="/" className="btn btn-secondary mt-4">
        {lang === 'ar' ? 'العودة إلى القائمة' : 'Back to List'}
      </Link>
    </div>
  );
};

export default ViewHotel;
