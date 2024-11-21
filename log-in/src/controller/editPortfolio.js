const axios = require('axios');
const { ssl, url_database, puerto, calculo, gateway_url,simulacion } = require('../config/server');

module.exports = async (req, res) =>
{
  const { id, timestep, Initial_investment } = req.body;

  const risk_profile = await axios.get(`${ssl}://${url_database}:${puerto}/database/RiskProfile?query=customer_id&value=${id}`);

  const profile = {
    timestep: Number(timestep) , 
    risk_profile: risk_profile.data.data.risk_tolerance
  }
  
  const calculate = await axios.post(`${calculo}/get_simulation`, profile);
  const data_portfolio = await axios.get(`${gateway_url}/login/portfolio?query=customer_id&value=${id}`)
 
  let days = timestep;
 let simulation = {
  initial_balance:Number(Initial_investment),
  return_vector:Object?.values(calculate?.data?.timeline)
 }
 
 const newSimulation = await axios.post(`${simulacion}/post_balance`,simulation)

  let result = {   
    days_forecast: days + ' días',
    risks: ((calculate?.data[days]?.risk)*100).toFixed(2),
    returns: ((calculate?.data[days]?.return)*100).toFixed(2),
    timeline: simulation.return_vector,
    balance: newSimulation?.data.balance
  } 
 
  if(data_portfolio?.data?.simulation?.simulacion?.length < 5){
   let updateData ={    
    simulation:{
      user_portfolio:data_portfolio?.data.simulation.user_portfolio,
      simulacion:[result,...data_portfolio?.data?.simulation.simulacion]
    },
    customer_id:id
   }
   const response = await axios.patch(`${ssl}://${url_database}:${puerto}/CustomerPortfolio`, updateData)
   res.json(updateData.simulation)
  }else{
    let newSimulacion = data_portfolio?.data?.simulation?.simulacion
   
    newSimulacion.pop()
    
    let updateData ={
      simulation:{
        user_portfolio:data_portfolio?.data.simulation.user_portfolio,
        simulacion:[result,...newSimulacion]
      },
      customer_id:id
     }
   const response =  await axios.patch(`${ssl}://${url_database}:${puerto}/CustomerPortfolio`, updateData)
  
   res.json(updateData.simulation)
  }
}