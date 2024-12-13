;; Property Marketplace Contract
;; Handles listing, buying, and fractional ownership of properties

(use-trait property-token .property-token.property-token)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-not-authorized (err u401))
(define-constant err-invalid-price (err u402))
(define-constant err-listing-not-found (err u404))

;; Data variables
(define-map listings
  { property-id: uint }
  { price: uint,
    seller: principal,
    is-fractional: bool,
    total-fractions: uint,
    available-fractions: uint })

(define-map property-fractions
  { property-id: uint, owner: principal }
  { fraction-amount: uint })

;; Public functions
(define-public (list-property
    (property-id uint)
    (price uint)
    (is-fractional bool)
    (total-fractions uint))
  (begin
    (asserts! (> price u0) err-invalid-price)
    (asserts! (is-owner property-id tx-sender) err-not-authorized)
    (map-set listings
      { property-id: property-id }
      { price: price,
        seller: tx-sender,
        is-fractional: is-fractional,
        total-fractions: total-fractions,
        available-fractions: total-fractions })
    (ok true)))

(define-public (buy-property
    (property-id uint))
  (let ((listing (unwrap! (map-get? listings { property-id: property-id }) err-listing-not-found))
        (price (get price listing))
        (seller (get seller listing)))
    (begin
      (try! (stx-transfer? price tx-sender seller))
      (try! (contract-call? .property-token transfer-property property-id seller tx-sender))
      (map-delete listings { property-id: property-id })
      (ok true))))

(define-public (buy-fraction
    (property-id uint)
    (fraction-amount uint))
  (let ((listing (unwrap! (map-get? listings { property-id: property-id }) err-listing-not-found))
        (price (get price listing))
        (seller (get seller listing))
        (available (get available-fractions listing)))
    (begin
      (asserts! (get is-fractional listing) err-not-authorized)
      (asserts! (<= fraction-amount available) err-invalid-price)
      (let ((fraction-price (* price (/ fraction-amount (get total-fractions listing)))))
        (try! (stx-transfer? fraction-price tx-sender seller))
        (map-set property-fractions
          { property-id: property-id, owner: tx-sender }
          { fraction-amount: fraction-amount })
        (map-set listings
          { property-id: property-id }
          (merge listing { available-fractions: (- available fraction-amount) }))
        (ok true)))))

;; Read-only functions
(define-read-only (get-listing (property-id uint))
  (map-get? listings { property-id: property-id }))

(define-read-only (get-fraction-ownership (property-id uint) (owner principal))
  (map-get? property-fractions { property-id: property-id, owner: owner }))

(define-read-only (is-owner (property-id uint) (address principal))
  (is-eq address (unwrap! (nft-get-owner? property property-id) false)))

;; Error handling
(define-private (merge (a {price: uint, seller: principal, is-fractional: bool, total-fractions: uint, available-fractions: uint})
                      (b {available-fractions: uint}))
  (merge a b))
