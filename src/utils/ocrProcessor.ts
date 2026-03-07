import MlKitOcr from 'react-native-mlkit-ocr';
import * as ImageManipulator from 'expo-image-manipulator';
import { extractFieldsFromOCR } from './fieldExtractor';

export interface OCRProcessingResult {
  merchant: { value: string; confidence: number };
  date: { value: Date | null; confidence: number };
  amount: { value: number; confidence: number };
  vatAmount: { value: number | null; confidence: number };
  currency: string;
  fullText: string;
  overallConfidence: number;
}

/**
 * Process receipt image with OCR and extract fields
 */
export async function processReceiptImage(imagePath: string): Promise<OCRProcessingResult> {
  try {
    // 1. Preprocess image (resize for faster OCR, enhance contrast)
    const processed = await preprocessImage(imagePath);
    
    // 2. Run ML Kit OCR
    const ocrResult = await MlKitOcr.detectFromFile(processed.path);
    
    // 3. Extract fields (merchant, date, amount)
    const extractedFields = extractFieldsFromOCR(ocrResult);
    
    // 4. Calculate confidence scores
    const confidence = calculateConfidence(ocrResult, extractedFields);
    
    // 5. Compile result
    const result: OCRProcessingResult = {
      merchant: extractedFields.merchant,
      date: {
        value: extractedFields.date.value,
        confidence: extractedFields.date.confidence,
      },
      amount: extractedFields.amount,
      vatAmount: extractedFields.vatAmount || { value: null, confidence: 0 },
      currency: 'EUR',
      fullText: ocrResult.text,
      overallConfidence: confidence.overall,
    };
    
    return result;
  } catch (error) {
    console.error('OCR processing failed:', error);
    throw new Error('Failed to process receipt image');
  }
}

/**
 * Preprocess image for better OCR results
 */
async function preprocessImage(imagePath: string) {
  // Resize to max 1920px width (faster processing, still readable)
  // Compress to reduce file size
  const manipulations: ImageManipulator.ImageResult = await ImageManipulator.manipulateAsync(
    imagePath,
    [
      { resize: { width: 1920 } },
      { contrast: 1.2 }, // Slight contrast enhancement
    ],
    {
      compress: 0.8,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );
  
  return manipulations;
}

/**
 * Calculate confidence scores based on OCR quality
 */
function calculateConfidence(
  ocrResult: any,
  extractedFields: any
): { overall: number; merchant: number; date: number; amount: number } {
  // Average confidence from ML Kit blocks
  const blockConfidences = ocrResult.blocks.map((block: any) => block.confidence || 0);
  const avgConfidence = blockConfidences.length 
    ? blockConfidences.reduce((a: number, b: number) => a + b, 0) / blockConfidences.length
    : 0;
  
  // Factor in extraction confidence
  const merchantConfidence = extractedFields.merchant.confidence;
  const dateConfidence = extractedFields.date.confidence;
  const amountConfidence = extractedFields.amount.confidence;
  
  // Overall is weighted average (amount is most important)
  const overall = (avgConfidence * 0.3 + merchantConfidence * 0.2 + dateConfidence * 0.2 + amountConfidence * 0.3);
  
  return {
    overall,
    merchant: merchantConfidence,
    date: dateConfidence,
    amount: amountConfidence,
  };
}
