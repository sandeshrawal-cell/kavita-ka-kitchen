module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1800');
  const lat = Number(req.query.lat || 21.1702);
  const lon = Number(req.query.lon || 72.8311);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return res.status(400).json({ok:false,message:'Invalid coordinates'});
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&current=temperature_2m,apparent_temperature,precipitation,rain,weather_code&timezone=auto`;
    const r = await fetch(url);
    if (!r.ok) throw new Error('Weather provider unavailable');
    const data = await r.json();
    const c = data.current || {};
    let kind='pleasant';
    if ((c.rain||0)>0 || (c.precipitation||0)>0 || [51,53,55,61,63,65,80,81,82,95,96,99].includes(c.weather_code)) kind='rainy';
    else if ((c.apparent_temperature ?? c.temperature_2m) >= 32) kind='hot';
    else if ((c.apparent_temperature ?? c.temperature_2m) <= 20) kind='cool';
    res.status(200).json({ok:true,kind,temperature:c.temperature_2m,feels:c.apparent_temperature,code:c.weather_code});
  } catch (e) {
    res.status(200).json({ok:false,kind:'pleasant',message:e.message});
  }
};
