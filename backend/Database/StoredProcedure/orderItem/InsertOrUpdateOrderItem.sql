USE [comfortyEcommerce]
GO
CREATE PROCEDURE InsertOrUpdateOrderItem
@id VARCHAR(255),
@order_id VARCHAR(255),
@product_id VARCHAR(255),
@quantity INTEGER
AS
BEGIN
    IF @id IS NULL
    BEGIN
        INSERT INTO order_items (id, order_id, product_id, quantity)
        VALUES (@id, @order_id, @product_id, @quantity)
        SELECT * FROM order_items WHERE id = @id
    END
    ELSE
    BEGIN
        UPDATE order_items SET order_id = @order_id, product_id = @product_id, quantity = @quantity WHERE id = @id
        SELECT * FROM order_items WHERE id = @id
    END
END

