Rails.application.routes.draw do
  root 'pages#home'

  get 'pages/snakes'
end
