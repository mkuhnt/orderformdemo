Rails.application.routes.draw do
  resources :orders
  root 'order#index'
end
