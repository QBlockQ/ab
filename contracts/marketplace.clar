(define-map listings
  { property-id: uint }
  { price: uint,
    seller: principal })

(define-public (list-property
    (property-id uint)
    (price uint))
  (begin
    (try! (is-owner property-id tx-sender))
    (map-set listings
      { property-id: property-id }
      { price: price, seller: tx-sender })
    (ok true))) 