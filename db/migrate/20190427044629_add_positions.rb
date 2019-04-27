class AddPositions < ActiveRecord::Migration[5.2]
  def change
    create_table :positions do |t|
      t.references :order, foreign_key: true
      t.string :title
      t.string :speciality_area

      t.timestamps
    end
  end
end
