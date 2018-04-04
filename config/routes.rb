Rails.application.routes.draw do
  get "/places" => "places#index"
  post "/places" => "places#create"
end
