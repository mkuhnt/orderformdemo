class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.string :title
      t.text :briefing
      t.string :customer

      t.timestamps
    end
  end
end
