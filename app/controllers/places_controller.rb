class PlacesController < ApplicationController
  def index
    place = Place.all 
    render json: place.as_json
  end
  def create
    place = Place.create(name:params["name"], address:params["address"])
    place.save
  end
end
