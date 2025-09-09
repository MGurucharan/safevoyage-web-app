$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    name = "Test User"
    email = "test@example.com"
    phone = "1234567890"
    address = "Test Address"
} | ConvertTo-Json

Write-Host "=== Testing Digital ID Generation ===" -ForegroundColor Green

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/digital-id/generate" -Method POST -Headers $headers -Body $body
    
    if ($response.success) {
        Write-Host "✅ Digital ID generated successfully!" -ForegroundColor Green
        Write-Host "ID: $($response.data.digitalID._id)"
        
        # Extract QR data for verification
        $mongoId = $response.data.digitalID._id
        $transactionHash = $response.data.digitalID.blockchainData.transactionHash
        
        Write-Host "`n=== Testing Digital ID Verification ===" -ForegroundColor Green
        
        $verifyBody = @{
            mongoId = $mongoId
            transactionHash = $transactionHash
        } | ConvertTo-Json
        
        $verifyResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/digital-id/verify" -Method POST -Headers $headers -Body $verifyBody
        
        Write-Host "`n=== Verification Result ===" -ForegroundColor Yellow
        Write-Host "Success: $($verifyResponse.success)"
        Write-Host "Verified: $($verifyResponse.verified)"
        Write-Host "Message: $($verifyResponse.message)"
        
        if ($verifyResponse.verified) {
            Write-Host "✅ VERIFICATION SUCCESSFUL - Digital ID is valid!" -ForegroundColor Green
        } else {
            Write-Host "❌ VERIFICATION FAILED" -ForegroundColor Red
            Write-Host "Reason: $($verifyResponse.reason)"
        }
        
    } else {
        Write-Host "❌ Generation failed: $($response.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
}
