;; Property Token Contract
(define-non-fungible-token property uint)

(define-data-var total-properties uint u0)

(define-public (mint-property 
    (property-id uint)
    (owner principal)
    (metadata (string-ascii 256)))
  (begin
    (try! (nft-mint? property property-id owner))
    (var-set total-properties (+ (var-get total-properties) u1))
    (ok true)))

(define-public (transfer-property
    (property-id uint)
    (sender principal)
    (recipient principal))
  (begin
    (try! (nft-transfer? property property-id sender recipient))
    (ok true))) 